import React from 'react';
import { Briefcase } from 'lucide-react';
import { ChartContainer } from './ChartContainer';
import { LineChart } from './LineChart';
import type { TimeSeriesData } from '../../types';

interface ProjectsChartProps {
  data: TimeSeriesData[];
  isLoading: boolean;
  timeframe: string;
}

export function ProjectsChart({ data, isLoading, timeframe }: ProjectsChartProps) {
  return (
    <ChartContainer
      title="Projects"
      icon={Briefcase}
      isLoading={isLoading}
    >
      <LineChart
        data={data}
        timeframe={timeframe}
        color="blue"
      />
    </ChartContainer>
  );
}