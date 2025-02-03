export interface AnalyticsMetrics {
  revenue: number;
  revenueChange: number;
  activeUsers: number;
  activeUsersChange: number;
  projectSuccessRate: number;
  projectSuccessRateChange: number;
  avgProjectValue: number;
  avgProjectValueChange: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  avatar: string;
  metric: number;
  change: number;
  category: string;
}

export interface AnalyticsData {
  metrics: AnalyticsMetrics;
  revenue: TimeSeriesData[];
  userGrowth: TimeSeriesData[];
  projects: TimeSeriesData[];
  topPerformers: TopPerformer[];
}