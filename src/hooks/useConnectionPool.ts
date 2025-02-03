import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase/client';

interface PoolConfig {
  maxConnections: number;
  minConnections: number;
  idleTimeout: number;
}

interface PooledConnection {
  id: string;
  channel: any;
  lastUsed: number;
  isIdle: boolean;
}

export function useConnectionPool(config: PoolConfig) {
  const poolRef = useRef<Map<string, PooledConnection>>(new Map());
  const queueRef = useRef<Array<() => void>>([]);

  // Initialize connection pool
  useEffect(() => {
    // Create minimum connections
    for (let i = 0; i < config.minConnections; i++) {
      createConnection();
    }

    // Cleanup idle connections
    const cleanup = setInterval(() => {
      const now = Date.now();
      const pool = poolRef.current;

      for (const [id, conn] of pool.entries()) {
        if (conn.isIdle && now - conn.lastUsed > config.idleTimeout) {
          conn.channel.unsubscribe();
          pool.delete(id);
        }
      }

      // Maintain minimum connections
      if (pool.size < config.minConnections) {
        createConnection();
      }
    }, config.idleTimeout / 2);

    return () => {
      clearInterval(cleanup);
      // Cleanup all connections
      poolRef.current.forEach(conn => conn.channel.unsubscribe());
      poolRef.current.clear();
    };
  }, [config.minConnections, config.idleTimeout]);

  const createConnection = () => {
    const id = crypto.randomUUID();
    const channel = supabase.channel(`pool-${id}`);
    
    poolRef.current.set(id, {
      id,
      channel,
      lastUsed: Date.now(),
      isIdle: true
    });

    return id;
  };

  const getConnection = () => {
    const pool = poolRef.current;
    
    // Find an idle connection
    for (const [id, conn] of pool.entries()) {
      if (conn.isIdle) {
        conn.isIdle = false;
        conn.lastUsed = Date.now();
        return conn;
      }
    }

    // Create new connection if pool not at max
    if (pool.size < config.maxConnections) {
      const id = createConnection();
      const conn = pool.get(id)!;
      conn.isIdle = false;
      return conn;
    }

    // Return null if pool is full
    return null;
  };

  const releaseConnection = (id: string) => {
    const conn = poolRef.current.get(id);
    if (conn) {
      conn.isIdle = true;
      conn.lastUsed = Date.now();

      // Process next queued request
      const nextRequest = queueRef.current.shift();
      if (nextRequest) {
        nextRequest();
      }
    }
  };

  return {
    getConnection,
    releaseConnection,
    queueRequest: (request: () => void) => {
      queueRef.current.push(request);
    }
  };
}