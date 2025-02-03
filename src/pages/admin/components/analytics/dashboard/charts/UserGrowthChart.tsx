import React from 'react';
import { Users } from 'lucide-react';
import { ChartContainer } from './ChartContainer';
import { LineChart } from './LineChart';
import type { TimeSeriesData } from '../../types';

interface UserGrowthChartProps {
  data: TimeSeriesData[];
  isLoading: boolean;
  timeframe: string;
}

export function UserGrowthChart({ data, isLoading, timeframe }: UserGrowthChartProps) {
  return (
    <ChartContainer
      title="User Growth"
      icon={Users}
      isLoading={isLoading}
    >
      <LineChart
        data={data}
        timeframe={timeframe}
        color="green"
      />
    </ChartContainer>
  );
}