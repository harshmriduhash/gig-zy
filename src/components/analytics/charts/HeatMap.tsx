import React from 'react';

interface HeatMapProps {
  data: Array<{
    x: string;
    y: string;
    value: number;
  }>;
  xLabels: string[];
  yLabels: string[];
  colorScale?: string[];
}

export function HeatMap({ 
  data, 
  xLabels, 
  yLabels, 
  colorScale = ['#f7fafc', '#4299e1', '#2b6cb0'] 
}: HeatMapProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  const getColor = (value: number) => {
    const percentage = value / maxValue;
    if (percentage <= 0) return colorScale[0];
    if (percentage >= 1) return colorScale[colorScale.length - 1];

    const index = Math.floor(percentage * (colorScale.length - 1));
    const remainder = percentage * (colorScale.length - 1) - index;

    const color1 = colorScale[index];
    const color2 = colorScale[index + 1];

    // Interpolate between colors
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * remainder);
    const g = Math.round(g1 + (g2 - g1) * remainder);
    const b = Math.round(b1 + (b2 - b1) * remainder);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="grid" style={{ 
          gridTemplateColumns: `auto repeat(${xLabels.length}, minmax(40px, 1fr))` 
        }}>
          {/* Empty top-left cell */}
          <div className="h-8" />

          {/* X-axis labels */}
          {xLabels.map((label) => (
            <div
              key={label}
              className="h-8 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400"
            >
              {label}
            </div>
          ))}

          {/* Y-axis labels and cells */}
          {yLabels.map((yLabel) => (
            <React.Fragment key={yLabel}>
              <div className="h-8 flex items-center justify-end pr-2 text-xs text-gray-600 dark:text-gray-400">
                {yLabel}
              </div>
              {xLabels.map((xLabel) => {
                const cell = data.find(d => d.x === xLabel && d.y === yLabel);
                return (
                  <div
                    key={`${xLabel}-${yLabel}`}
                    className="relative h-8 group"
                  >
                    <div
                      className="absolute inset-0.5 rounded transition-colors"
                      style={{ backgroundColor: getColor(cell?.value || 0) }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          {cell?.value || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}