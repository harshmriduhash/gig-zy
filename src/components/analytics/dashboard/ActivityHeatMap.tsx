import React from 'react';
import { HeatMap } from '../charts/HeatMap';
import { ChartContainer } from './charts/ChartContainer';
import { Calendar } from 'lucide-react';

interface ActivityHeatMapProps {
  data: Array<{
    x: string; // Day of week
    y: string; // Hour
    value: number;
  }>;
  isLoading: boolean;
}

export function ActivityHeatMap({ data, isLoading }: ActivityHeatMapProps) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => 
    i === 0 ? '12am' : 
    i < 12 ? `${i}am` : 
    i === 12 ? '12pm' : 
    `${i-12}pm`
  );

  return (
    <ChartContainer
      title="Activity Distribution"
      icon={Calendar}
      isLoading={isLoading}
    >
      <div className="mt-4">
        <HeatMap
          data={data}
          xLabels={daysOfWeek}
          yLabels={hours}
          colorScale={[
            '#F3F4F6', // gray-100
            '#818CF8', // indigo-400
            '#4F46E5'  // indigo-600
          ]}
        />
      </div>
    </ChartContainer>
  );
}