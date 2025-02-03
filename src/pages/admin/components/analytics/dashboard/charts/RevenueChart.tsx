import React from 'react';
import { DollarSign } from 'lucide-react';
import { ChartContainer } from './ChartContainer';
import { LineChart } from './LineChart';
import type { TimeSeriesData } from '../../types';

interface RevenueChartProps {
  data: TimeSeriesData[];
  isLoading: boolean;
  timeframe: string;
}

export function RevenueChart({ data, isLoading, timeframe }: RevenueChartProps) {
  return (
    <ChartContainer
      title="Revenue"
      icon={DollarSign}
      isLoading={isLoading}
    >
      <LineChart
        data={data}
        timeframe={timeframe}
        valuePrefix="$"
        color="indigo"
      />
    </ChartContainer>
  );
}