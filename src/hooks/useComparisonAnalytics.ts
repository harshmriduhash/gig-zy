import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface ComparisonPeriod {
  start: Date;
  end: Date;
}

interface ComparisonData {
  current: {
    revenue: number;
    users: number;
    projects: number;
    transactions: number;
  };
  comparison: {
    revenue: number;
    users: number;
    projects: number;
    transactions: number;
  };
  changes: {
    revenue: number;
    users: number;
    projects: number;
    transactions: number;
  };
}

export function useComparisonAnalytics(
  currentPeriod: ComparisonPeriod,
  comparisonType: 'previous_period' | 'year_over_year' | 'custom_baseline',
  customBaseline?: ComparisonPeriod
) {
  const [data, setData] = useState<ComparisonData>({
    current: { revenue: 0, users: 0, projects: 0, transactions: 0 },
    comparison: { revenue: 0, users: 0, projects: 0, transactions: 0 },
    changes: { revenue: 0, users: 0, projects: 0, transactions: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchComparisonData() {
      try {
        // Calculate comparison period
        const comparisonPeriod = getComparisonPeriod(
          currentPeriod,
          comparisonType,
          customBaseline
        );

        // Fetch current period data
        const currentData = await fetchPeriodData(currentPeriod);

        // Fetch comparison period data
        const comparisonData = await fetchPeriodData(comparisonPeriod);

        // Calculate changes
        const changes = {
          revenue: calculatePercentageChange(
            comparisonData.revenue,
            currentData.revenue
          ),
          users: calculatePercentageChange(
            comparisonData.users,
            currentData.users
          ),
          projects: calculatePercentageChange(
            comparisonData.projects,
            currentData.projects
          ),
          transactions: calculatePercentageChange(
            comparisonData.transactions,
            currentData.transactions
          )
        };

        setData({
          current: currentData,
          comparison: comparisonData,
          changes
        });
      } catch (err) {
        console.error('Error fetching comparison data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch comparison data'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchComparisonData();
  }, [currentPeriod, comparisonType, customBaseline]);

  return { data, isLoading, error };
}

async function fetchPeriodData(period: ComparisonPeriod) {
  const [
    { data: transactions },
    { count: users },
    { count: projects },
    { count: completedTransactions }
  ] = await Promise.all([
    // Revenue data
    supabase
      .from('transactions')
      .select('amount')
      .gte('created_at', period.start.toISOString())
      .lte('created_at', period.end.toISOString())
      .eq('status', 'completed'),

    // New users
    supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', period.start.toISOString())
      .lte('created_at', period.end.toISOString()),

    // New projects
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', period.start.toISOString())
      .lte('created_at', period.end.toISOString()),

    // Completed transactions
    supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', period.start.toISOString())
      .lte('created_at', period.end.toISOString())
      .eq('status', 'completed')
  ]);

  return {
    revenue: transactions?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
    users: users || 0,
    projects: projects || 0,
    transactions: completedTransactions || 0
  };
}

function getComparisonPeriod(
  currentPeriod: ComparisonPeriod,
  comparisonType: string,
  customBaseline?: ComparisonPeriod
): ComparisonPeriod {
  if (comparisonType === 'custom_baseline' && customBaseline) {
    return customBaseline;
  }

  const periodLength = currentPeriod.end.getTime() - currentPeriod.start.getTime();
  const comparisonEnd = new Date(currentPeriod.start);
  const comparisonStart = new Date(comparisonEnd.getTime() - periodLength);

  if (comparisonType === 'year_over_year') {
    comparisonStart.setFullYear(comparisonStart.getFullYear() - 1);
    comparisonEnd.setFullYear(comparisonEnd.getFullYear() - 1);
  }

  return {
    start: comparisonStart,
    end: comparisonEnd
  };
}

function calculatePercentageChange(previous: number, current: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}