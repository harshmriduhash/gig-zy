import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase/client';
import { useRealtimeCache } from './useRealtimeCache';
import { useRealtimeAggregator } from './useRealtimeAggregator';

interface ConnectionConfig {
  tables: string[];
  retryAttempts?: number;
  retryDelay?: number;
  batchSize?: number;
  batchInterval?: number;
}

export function useRealtimeConnection(config: ConnectionConfig) {
  const [isConnected, setIsConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  // Cache configuration
  const { getCached, setCached } = useRealtimeCache({
    key: 'realtime-data',
    ttl: 60000 // 1 minute cache
  });

  // Aggregator configuration
  const { addToBatch, aggregatedData } = useRealtimeAggregator({
    batchSize: config.batchSize || 10,
    batchInterval: config.batchInterval || 5000,
    aggregator: (data) => data.reduce((acc, curr) => ({
      ...acc,
      ...curr
    }), {})
  });

  // Handle connection retry
  const retryConnection = useCallback(() => {
    if (retryCount >= (config.retryAttempts || 3)) {
      setError(new Error('Maximum retry attempts reached'));
      return;
    }

    setTimeout(() => {
      setRetryCount(prev => prev + 1);
      setupSubscriptions();
    }, (config.retryDelay || 5000) * Math.pow(2, retryCount));
  }, [retryCount, config.retryAttempts, config.retryDelay]);

  // Set up subscriptions
  const setupSubscriptions = useCallback(() => {
    const channels = config.tables.map(table => {
      return supabase
        .channel(`${table}-changes`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table
        }, (payload) => {
          // Check cache first
          const cachedData = getCached(table);
          if (cachedData) {
            addToBatch({ ...cachedData, ...payload.new });
          } else {
            addToBatch(payload.new);
          }
          
          // Update cache
          setCached(table, payload.new);
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
  }, [config.tables, retryConnection]);

  // Initialize connection
  useEffect(() => {
    const cleanup = setupSubscriptions();
    return cleanup;
  }, [setupSubscriptions]);

  return {
    isConnected,
    error,
    retryCount,
    aggregatedData
  };
}