import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface AnalyticsFilters {
  timeframe: 'week' | 'month' | 'quarter' | 'year';
  comparison: 'previous_period' | 'previous_year';
}

interface TimeSeriesData {
  date: string;
  value: number;
}

interface AnalyticsData {
  metrics: {
    revenue: number;
    revenueChange: number;
    activeUsers: number;
    activeUsersChange: number;
    projectSuccessRate: number;
    projectSuccessRateChange: number;
    avgProjectValue: number;
    avgProjectValueChange: number;
  };
  revenue: TimeSeriesData[];
  userGrowth: TimeSeriesData[];
  projects: TimeSeriesData[];
  topPerformers: Array<{
    id: string;
    name: string;
    avatar: string;
    metric: number;
    change: number;
    category: string;
  }>;
}

export function useAnalytics(filters: AnalyticsFilters) {
  const [data, setData] = useState<AnalyticsData>({
    metrics: {
      revenue: 0,
      revenueChange: 0,
      activeUsers: 0,
      activeUsersChange: 0,
      projectSuccessRate: 0,
      projectSuccessRateChange: 0,
      avgProjectValue: 0,
      avgProjectValueChange: 0
    },
    revenue: [],
    userGrowth: [],
    projects: [],
    topPerformers: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const timeframeInDays = {
          week: 7,
          month: 30,
          quarter: 90,
          year: 365
        }[filters.timeframe];

        const currentPeriodStart = new Date();
        currentPeriodStart.setDate(currentPeriodStart.getDate() - timeframeInDays);

        const previousPeriodStart = new Date(currentPeriodStart);
        previousPeriodStart.setDate(previousPeriodStart.getDate() - timeframeInDays);

        // Fetch revenue data
        const { data: currentRevenue, error: revenueError } = await supabase
          .from('transactions')
          .select('amount, created_at')
          .eq('status', 'completed')
          .gte('created_at', currentPeriodStart.toISOString());

        if (revenueError) throw revenueError;

        const { data: previousRevenue } = await supabase
          .from('transactions')
          .select('amount, created_at')
          .eq('status', 'completed')
          .gte('created_at', previousPeriodStart.toISOString())
          .lt('created_at', currentPeriodStart.toISOString());

        // Calculate revenue metrics
        const currentTotal = currentRevenue?.reduce((sum, t) => sum + t.amount, 0) || 0;
        const previousTotal = previousRevenue?.reduce((sum, t) => sum + t.amount, 0) || 0;
        const revenueChange = previousTotal ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

        // Fetch user growth data
        const { data: currentUsers, error: usersError } = await supabase
          .from('users')
          .select('created_at')
          .gte('created_at', currentPeriodStart.toISOString());

        if (usersError) throw usersError;

        const { data: previousUsers } = await supabase
          .from('users')
          .select('created_at')
          .gte('created_at', previousPeriodStart.toISOString())
          .lt('created_at', currentPeriodStart.toISOString());

        // Calculate user metrics
        const activeUsers = currentUsers?.length || 0;
        const previousActiveUsers = previousUsers?.length || 0;
        const userGrowth = previousActiveUsers ? ((activeUsers - previousActiveUsers) / previousActiveUsers) * 100 : 0;

        // Fetch project data
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('status, created_at, budget_min, budget_max')
          .gte('created_at', currentPeriodStart.toISOString());

        if (projectsError) throw projectsError;

        // Calculate project metrics
        const completedProjects = projects?.filter(p => p.status === 'completed').length || 0;
        const totalProjects = projects?.length || 0;
        const projectSuccessRate = totalProjects ? (completedProjects / totalProjects) * 100 : 0;

        const avgProjectValue = projects?.reduce((sum, p) => sum + ((p.budget_min + p.budget_max) / 2), 0) || 0;

        // Fetch top performers
        const { data: topFreelancers, error: freelancersError } = await supabase
          .from('freelancer_profiles')
          .select(`
            user_id,
            total_earnings,
            user:user_id (
              full_name,
              avatar_url,
              rating
            )
          `)
          .order('total_earnings', { ascending: false })
          .limit(5);

        if (freelancersError) throw freelancersError;

        setData({
          metrics: {
            revenue: currentTotal,
            revenueChange,
            activeUsers,
            activeUsersChange: userGrowth,
            projectSuccessRate,
            projectSuccessRateChange: 0, // Calculate from previous period
            avgProjectValue,
            avgProjectValueChange: 0 // Calculate from previous period
          },
          revenue: aggregateTimeSeriesData(currentRevenue || []),
          userGrowth: aggregateTimeSeriesData(currentUsers || [], 'count'),
          projects: aggregateTimeSeriesData(projects || [], 'count'),
          topPerformers: topFreelancers.map(f => ({
            id: f.user_id,
            name: f.user.full_name,
            avatar: f.user.avatar_url,
            metric: f.total_earnings,
            change: 0, // Calculate from previous period
            category: 'Earnings'
          }))
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [filters]);

  return { data, isLoading, error };
}

function aggregateTimeSeriesData(data: any[], type: 'sum' | 'count' = 'sum'): TimeSeriesData[] {
  const aggregated = data.reduce((acc: { [key: string]: number }, item) => {
    const date = new Date(item.created_at).toISOString().split('T')[0];
    if (type === 'sum') {
      acc[date] = (acc[date] || 0) + (item.amount || 0);
    } else {
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(aggregated)
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => a.date.localeCompare(b.date));
}