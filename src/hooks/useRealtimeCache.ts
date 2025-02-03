import { useState, useEffect } from 'react';

interface CacheConfig {
  key: string;
  ttl: number; // Time to live in milliseconds
}

export function useRealtimeCache<T>(config: CacheConfig) {
  const [cache, setCache] = useState<Map<string, { data: T; timestamp: number }>>(new Map());

  // Clean up expired cache entries
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      const newCache = new Map(cache);
      
      for (const [key, entry] of newCache.entries()) {
        if (now - entry.timestamp > config.ttl) {
          newCache.delete(key);
        }
      }
      
      setCache(newCache);
    }, Math.min(config.ttl, 60000)); // Run cleanup at least every minute

    return () => clearInterval(cleanup);
  }, [config.ttl, cache]);

  const getCached = (key: string): T | null => {
    const entry = cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > config.ttl) {
      cache.delete(key);
      return null;
    }
    
    return entry.data;
  };

  const setCached = (key: string, data: T) => {
    setCache(prev => new Map(prev).set(key, {
      data,
      timestamp: Date.now()
    }));
  };

  return { getCached, setCached };
}