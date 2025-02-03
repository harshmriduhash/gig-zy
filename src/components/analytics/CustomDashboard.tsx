import React, { useState } from 'react';
import { LineChart } from './charts/LineChart';
import { MetricsGrid } from './dashboard/MetricsGrid';
import { TopPerformers } from './dashboard/TopPerformers';
import { Settings, Plus } from 'lucide-react';
import type { AnalyticsData } from './types';

interface CustomDashboardProps {
  data: AnalyticsData;
  isLoading: boolean;
}

interface DashboardWidget {
  id: string;
  type: 'metrics' | 'chart' | 'topPerformers';
  title: string;
  size: 'small' | 'medium' | 'large';
}

export function CustomDashboard({ data, isLoading }: CustomDashboardProps) {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    { id: 'metrics', type: 'metrics', title: 'Key Metrics', size: 'large' },
    { id: 'revenue', type: 'chart', title: 'Revenue Trend', size: 'medium' },
    { id: 'performers', type: 'topPerformers', title: 'Top Performers', size: 'medium' }
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'metrics':
        return <MetricsGrid data={data} isLoading={isLoading} />;
      case 'chart':
        return (
          <div className="h-[300px]">
            <LineChart
              data={data.revenue}
              timeframe="month"
              valuePrefix="$"
              color="indigo"
            />
          </div>
        );
      case 'topPerformers':
        return <TopPerformers data={data.topPerformers} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  const addWidget = () => {
    const newWidget: DashboardWidget = {
      id: crypto.randomUUID(),
      type: 'chart',
      title: 'New Widget',
      size: 'medium'
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Custom Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <Settings className="h-5 w-5" />
          </button>
          {isEditing && (
            <button
              onClick={addWidget}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Widget
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow ${
              widget.size === 'large' ? 'col-span-full' :
              widget.size === 'medium' ? 'col-span-1 md:col-span-1' :
              'col-span-1'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {widget.title}
                </h3>
                {isEditing && (
                  <button
                    onClick={() => removeWidget(widget.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {renderWidget(widget)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}