import React from 'react';
import { BarChart } from '../charts/BarChart';
import { ChartContainer } from './charts/ChartContainer';
import { BarChart2 } from 'lucide-react';

interface CategoryBreakdownProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  title: string;
  valuePrefix?: string;
  isLoading: boolean;
}

export function CategoryBreakdown({ data, title, valuePrefix, isLoading }: CategoryBreakdownProps) {
  const colors = [
    'bg-indigo-600 dark:bg-indigo-500',
    'bg-violet-600 dark:bg-violet-500',
    'bg-pink-600 dark:bg-pink-500',
    'bg-red-600 dark:bg-red-500',
    'bg-amber-600 dark:bg-amber-500',
    'bg-emerald-600 dark:bg-emerald-500',
    'bg-blue-600 dark:bg-blue-500'
  ];

  const chartData = data.map((item, index) => ({
    ...item,
    color: colors[index % colors.length]
  }));

  return (
    <ChartContainer
      title={title}
      icon={BarChart2}
      isLoading={isLoading}
    >
      <div className="h-[300px] mt-4">
        <BarChart
          data={chartData}
          valuePrefix={valuePrefix}
        />
      </div>
    </ChartContainer>
  );
}