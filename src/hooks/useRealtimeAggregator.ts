import { useState, useEffect, useCallback } from 'react';

interface AggregatorConfig<T> {
  batchSize?: number;
  batchInterval?: number;
  aggregator: (data: T[]) => T;
}

export function useRealtimeAggregator<T>(config: AggregatorConfig<T>) {
  const [batch, setBatch] = useState<T[]>([]);
  const [aggregatedData, setAggregatedData] = useState<T | null>(null);

  const processBatch = useCallback(() => {
    if (batch.length === 0) return;
    
    const aggregated = config.aggregator(batch);
    setAggregatedData(aggregated);
    setBatch([]);
  }, [batch, config.aggregator]);

  // Process batch when it reaches batchSize
  useEffect(() => {
    if (batch.length >= (config.batchSize || 10)) {
      processBatch();
    }
  }, [batch, config.batchSize, processBatch]);

  // Process batch on interval
  useEffect(() => {
    const interval = setInterval(() => {
      processBatch();
    }, config.batchInterval || 5000);

    return () => clearInterval(interval);
  }, [config.batchInterval, processBatch]);

  const addToBatch = (item: T) => {
    setBatch(prev => [...prev, item]);
  };

  return {
    addToBatch,
    aggregatedData,
    currentBatch: batch
  };
}