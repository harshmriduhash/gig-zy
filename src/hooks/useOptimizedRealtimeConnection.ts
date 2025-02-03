import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase/client';
import { useConnectionPool } from './useConnectionPool';
import { useDataCompression } from './useDataCompression';
import { usePriorityQueue } from './usePriorityQueue';
import { useRealtimeCache } from './useRealtimeCache';
import { useRealtimeAggregator } from './useRealtimeAggregator';

interface OptimizedConnectionConfig {
  tables: Array<{
    name: string;
    priority: number;
  }>;
  poolConfig?: {
    maxConnections?: number;
    minConnections?: number;
    idleTimeout?: number;
  };
  retryConfig?: {
    maxAttempts?: number;
    baseDelay?: number;
  };
  batchConfig?: {
    size?: number;
    interval?: number;
  };
}

export function useOptimizedRealtimeConnection(config: OptimizedConnectionConfig) {
  const [isConnected, setIsConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  // Initialize optimizations
  const { getConnection, releaseConnection, queueRequest } = useConnectionPool({
    maxConnections: config.poolConfig?.maxConnections || 5,
    minConnections: config.poolConfig?.minConnections || 2,
    idleTimeout: config.poolConfig?.idleTimeout || 30000
  });

  const { compress, decompress } = useDataCompression();
  const queue = usePriorityQueue<any>();

  // Cache configuration
  const { getCached, setCached } = useRealtimeCache({
    key: 'optimized-realtime',
    ttl: 60000 // 1 minute cache
  });

  // Aggregator configuration
  const { addToBatch, aggregatedData } = useRealtimeAggregator({
    batchSize: config.batchConfig?.size || 10,
    batchInterval: config.batchConfig?.interval || 5000,
    aggregator: (data) => data.reduce((acc, curr) => ({
      ...acc,
      ...curr
    }), {})
  });

  // Handle connection retry with exponential backoff
  const retryConnection = useCallback(() => {
    const maxAttempts = config.retryConfig?.maxAttempts || 3;
    const baseDelay = config.retryConfig?.baseDelay || 1000;

    if (retryCount >= maxAttempts) {
      setError(new Error('Maximum retry attempts reached'));
      return;
    }

    const delay = baseDelay * Math.pow(2, retryCount);
    setTimeout(() => {
      setRetryCount(prev => prev + 1);
      setupSubscriptions();
    }, delay);
  }, [retryCount, config.retryConfig]);

  // Process queued data
  const processQueue = useCallback(() => {
    while (!queue.isEmpty()) {
      const data = queue.dequeue();
      if (data) {
        const conn = getConnection();
        if (conn) {
          try {
            // Compress data before sending
            const compressed = compress(data);
            if (compressed) {
              addToBatch(data);
              setCached(data.table, data);
            }
          } finally {
            releaseConnection(conn.id);
          }
        } else {
          // If no connection available, re-queue with high priority
          queue.enqueue(data, 10);
          break;
        }
      }
    }
  }, [queue, getConnection, releaseConnection, compress, addToBatch, setCached]);

  // Set up subscriptions
  const setupSubscriptions = useCallback(() => {
    const channels = config.tables.map(table => {
      return supabase
        .channel(`${table.name}-changes`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: table.name
        }, (payload) => {
          // Queue incoming data with table priority
          queue.enqueue({
            table: table.name,
            data: payload.new
          }, table.priority);

          // Process queue
          processQueue();
        })
        .subscribe(status => {
          if (status === 'SUBSCRIBED') {
            setIsConnected(true);
            setError(null);
            setRetryCount(0);
          } else {
            setIsConnected(false);
            retryConnection();
          }
        });
    });

    return () => {
      channels.forEach(channel => channel.unsubscribe());
    };
  }, [config.tables, queue, processQueue, retryConnection]);

  // Initialize connection
  useEffect(() => {
    const cleanup = setupSubscriptions();
    
    // Process queue periodically
    const queueProcessor = setInterval(processQueue, 1000);

    return () => {
      cleanup();
      clearInterval(queueProcessor);
    };
  }, [setupSubscriptions, processQueue]);

  return {
    isConnected,
    error,
    retryCount,
    aggregatedData
  };
}