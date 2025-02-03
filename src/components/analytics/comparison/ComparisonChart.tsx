import React from 'react';
import { LineChart } from '../charts/LineChart';
import { ChartContainer } from '../dashboard/charts/ChartContainer';
import { TrendingUp } from 'lucide-react';

interface ComparisonChartProps {
  currentData: Array<{ date: string; value: number }>;
  comparisonData: Array<{ date: string; value: number }>;
  title: string;
  valuePrefix?: string;
  comparisonLabel: string;
  isLoading: boolean;
}

export function ComparisonChart({
  currentData,
  comparisonData,
  title,
  valuePrefix,
  comparisonLabel,
  isLoading
}: ComparisonChartProps) {
  // Normalize dates for comparison
  const normalizedComparison = comparisonData.map((point, index) => ({
    date: currentData[index]?.date || point.date,
    value: point.value
  }));

  return (
    <ChartContainer
      title={title}
      icon={TrendingUp}
      isLoading={isLoading}
    >
      <div className="relative h-[300px]">
        {/* Current period line */}
        <div className="absolute inset-0">
          <LineChart
            data={currentData}
            valuePrefix={valuePrefix}
            color="indigo"
          />
        </div>

        {/* Comparison period line (dashed) */}
        <div className="absolute inset-0">
          <LineChart
            data={normalizedComparison}
            valuePrefix={valuePrefix}
            color="gray"
            dashed
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="h-1 w-4 bg-indigo-600 dark:bg-indigo-400 rounded mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Current Period
          </span>
        </div>
        <div className="flex items-center">
          <div className="h-1 w-4 bg-gray-400 dark:bg-gray-500 rounded-sm mr-2 border-t-2 border-dashed" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {comparisonLabel}
          </span>
        </div>
      </div>
    </ChartContainer>
  );
}