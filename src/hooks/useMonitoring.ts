import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface PerformanceMetrics {
  responseTime: number;
  throughput: number;
  errorRate: number;
  memoryUsage: number;
}

interface ConnectionMetrics {
  activeConnections: number;
  connectionErrors: number;
  reconnectAttempts: number;
  averageLatency: number;
}

interface ErrorMetrics {
  totalErrors: number;
  errorsByType: Record<string, number>;
  errorsByEndpoint: Record<string, number>;
  recentErrors: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
    context?: any;
  }>;
}

export function useMonitoring() {
  const [performance, setPerformance] = useState<PerformanceMetrics>({
    responseTime: 0,
    throughput: 0,
    errorRate: 0,
    memoryUsage: 0
  });

  const [connections, setConnections] = useState<ConnectionMetrics>({
    activeConnections: 0,
    connectionErrors: 0,
    reconnectAttempts: 0,
    averageLatency: 0
  });

  const [errors, setErrors] = useState<ErrorMetrics>({
    totalErrors: 0,
    errorsByType: {},
    errorsByEndpoint: {},
    recentErrors: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Track performance metrics
  useEffect(() => {
    let mounted = true;
    const intervals: NodeJS.Timeout[] = [];

    const trackPerformance = async () => {
      try {
        const start = performance.now();
        
        // Make a simple query to measure response time
        await supabase.from('monitoring_stats').select('count').single();
        
        const responseTime = performance.now() - start;
        
        if (mounted) {
          setPerformance(prev => ({
            ...prev,
            responseTime,
            memoryUsage: (window.performance as any).memory?.usedJSHeapSize || 0,
            throughput: prev.throughput + 1,
            errorRate: (prev.errorRate * prev.throughput + 0) / (prev.throughput + 1)
          }));
        }
      } catch (err) {
        if (mounted) {
          setPerformance(prev => ({
            ...prev,
            throughput: prev.throughput + 1,
            errorRate: (prev.errorRate * prev.throughput + 1) / (prev.throughput + 1)
          }));
        }
      }
    };

    // Track performance every 5 seconds
    intervals.push(setInterval(trackPerformance, 5000));

    return () => {
      mounted = false;
      intervals.forEach(clearInterval);
    };
  }, []);

  // Track connection metrics
  useEffect(() => {
    let mounted = true;
    const intervals: NodeJS.Timeout[] = [];

    const trackConnections = async () => {
      try {
        // Get active realtime subscriptions
        const channels = supabase.getChannels();
        
        if (mounted) {
          setConnections(prev => ({
            ...prev,
            activeConnections: channels.length,
            averageLatency: channels.reduce((sum, channel) => {
              const latency = (channel as any)._latency || 0;
              return sum + latency;
            }, 0) / (channels.length || 1)
          }));
        }
      } catch (err) {
        console.error('Error tracking connections:', err);
      }
    };

    // Track connections every 10 seconds
    intervals.push(setInterval(trackConnections, 10000));

    return () => {
      mounted = false;
      intervals.forEach(clearInterval);
    };
  }, []);

  // Track errors
  useEffect(() => {
    let mounted = true;
    const intervals: NodeJS.Timeout[] = [];

    const trackErrors = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('error_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (fetchError) throw fetchError;

        if (mounted && data) {
          // Aggregate error metrics
          const errorsByType: Record<string, number> = {};
          const errorsByEndpoint: Record<string, number> = {};

          data.forEach(error => {
            errorsByType[error.type] = (errorsByType[error.type] || 0) + 1;
            errorsByEndpoint[error.endpoint] = (errorsByEndpoint[error.endpoint] || 0) + 1;
          });

          setErrors({
            totalErrors: data.length,
            errorsByType,
            errorsByEndpoint,
            recentErrors: data.slice(0, 10).map(error => ({
              id: error.id,
              type: error.type,
              message: error.message,
              timestamp: error.created_at,
              context: error.context
            }))
          });
        }
      } catch (err) {
        console.error('Error tracking errors:', err);
      }
    };

    // Track errors every 30 seconds
    intervals.push(setInterval(trackErrors, 30000));

    return () => {
      mounted = false;
      intervals.forEach(clearInterval);
    };
  }, []);

  return {
    performance,
    connections,
    errors,
    isLoading,
    error
  };
}