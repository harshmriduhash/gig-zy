import React from 'react';
import type { TimeSeriesData } from '../../types';

interface LineChartProps {
  data: TimeSeriesData[];
  timeframe: string;
  valuePrefix?: string;
  color: 'indigo' | 'green' | 'blue';
}

export function LineChart({ data, timeframe, valuePrefix = '', color }: LineChartProps) {
  const getColorClass = () => {
    switch (color) {
      case 'indigo':
        return 'text-indigo-600 dark:text-indigo-400';
      case 'green':
        return 'text-green-600 dark:text-green-400';
      case 'blue':
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  // Calculate min and max values for scaling
  const values = data.map(d => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min;

  // Scale points to fit the chart height
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative h-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{valuePrefix}{max.toLocaleString()}</span>
        <span>{valuePrefix}{min.toLocaleString()}</span>
      </div>

      {/* Chart area */}
      <div className="absolute left-16 right-0 top-0 bottom-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="25%" x2="100%" y2="25%" className="stroke-gray-200 dark:stroke-gray-700" strokeDasharray="4" />
          <line x1="0" y1="50%" x2="100%" y2="50%" className="stroke-gray-200 dark:stroke-gray-700" strokeDasharray="4" />
          <line x1="0" y1="75%" x2="100%" y2="75%" className="stroke-gray-200 dark:stroke-gray-700" strokeDasharray="4" />

          {/* Line chart */}
          <polyline
            points={points}
            fill="none"
            className={`stroke-2 ${getColorClass()}`}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {data.map((d, i) => (
            <span key={i}>{new Date(d.date).toLocaleDateString()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}