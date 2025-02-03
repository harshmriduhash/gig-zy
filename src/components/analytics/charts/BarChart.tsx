import React from 'react';

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  valuePrefix?: string;
}

export function BarChart({ data, height = 300, valuePrefix = '' }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const defaultColor = 'bg-indigo-600 dark:bg-indigo-500';

  return (
    <div style={{ height }} className="relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {valuePrefix}
            {((maxValue * (4 - i)) / 4).toLocaleString()}
          </span>
        ))}
      </div>

      {/* Chart area */}
      <div className="absolute left-16 right-0 top-0 bottom-8">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-gray-200 dark:border-gray-700"
              style={{ top: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        {/* Bars */}
        <div className="relative h-full flex items-end justify-around">
          {data.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center"
              style={{ width: `${100 / data.length}%` }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-900 text-white text-xs rounded py-1 px-2">
                  {valuePrefix}{item.value.toLocaleString()}
                </div>
              </div>

              {/* Bar */}
              <div
                className={`w-2/3 ${item.color || defaultColor} rounded-t transition-all duration-300 hover:opacity-80`}
                style={{
                  height: `${(item.value / maxValue) * 100}%`
                }}
              />

              {/* Label */}
              <div className="absolute -bottom-8 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}