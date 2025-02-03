import React from 'react';
import { MetricsGrid } from './MetricsGrid';
import { RevenueChart } from './charts/RevenueChart';
import { UserGrowthChart } from './charts/UserGrowthChart';
import { ProjectsChart } from './charts/ProjectsChart';
import { TopPerformers } from './TopPerformers';
import type { AnalyticsData } from '../types';

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  isLoading: boolean;
  error: Error | null;
  timeframe: string;
}

export function AnalyticsDashboard({ data, isLoading, error, timeframe }: AnalyticsDashboardProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading analytics: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MetricsGrid data={data} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart 
          data={data.revenue}
          isLoading={isLoading}
          timeframe={timeframe}
        />
        <UserGrowthChart 
          data={data.userGrowth}
          isLoading={isLoading}
          timeframe={timeframe}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectsChart 
          data={data.projects}
          isLoading={isLoading}
          timeframe={timeframe}
        />
        <TopPerformers 
          data={data.topPerformers}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}