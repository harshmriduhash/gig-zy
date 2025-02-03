import React from 'react';
import { PieChart } from '../charts/PieChart';
import { ChartContainer } from './charts/ChartContainer';
import { PieChart as PieChartIcon } from 'lucide-react';

interface DistributionChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  title: string;
  isLoading: boolean;
}

export function DistributionChart({ data, title, isLoading }: DistributionChartProps) {
  const colors = [
    '#4F46E5', // indigo-600
    '#7C3AED', // violet-600
    '#EC4899', // pink-600
    '#EF4444', // red-600
    '#F59E0B', // amber-600
    '#10B981', // emerald-600
    '#3B82F6'  // blue-600
  ];

  const chartData = data.map((item, index) => ({
    ...item,
    color: colors[index % colors.length]
  }));

  return (
    <ChartContainer
      title={title}
      icon={PieChartIcon}
      isLoading={isLoading}
    >
      <div className="flex flex-col items-center">
        <PieChart data={chartData} size={240} />
        <div className="mt-6 grid grid-cols-2 gap-4">
          {chartData.map((item) => (
            <div key={item.label} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
}