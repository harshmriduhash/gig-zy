import React from 'react';

interface PieChartProps {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  size?: number;
}

export function PieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          // Calculate path coordinates
          const startX = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
          const startY = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
          const endX = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
          const endY = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);

          const path = `
            M 50 50
            L ${startX} ${startY}
            A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z
          `;

          const segment = (
            <path
              key={index}
              d={path}
              fill={item.color}
              className="transition-all duration-300 hover:opacity-80"
            >
              <title>{`${item.label}: ${percentage.toFixed(1)}%`}</title>
            </path>
          );

          currentAngle += angle;
          return segment;
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {total.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total
          </div>
        </div>
      </div>
    </div>
  );
}