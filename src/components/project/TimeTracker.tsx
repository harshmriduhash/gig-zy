```typescript
import React, { useState, useEffect } from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { useProjectManagement } from '../../hooks/useProjectManagement';

interface TimeTrackerProps {
  projectId: string;
}

export function TimeTracker({ projectId }: TimeTrackerProps) {
  const { timeEntries, startTimeTracking, stopTimeTracking } = useProjectManagement();
  const [activeEntry, setActiveEntry] = useState<string | null>(null);
  const [task, setTask] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeEntry) {
      const entry = timeEntries.find(e => e.id === activeEntry);
      if (entry && !entry.end_time) {
        interval = setInterval(() => {
          const elapsed = Math.round(
            (Date.now() - new Date(entry.start_time).getTime()) / 1000
          );
          setElapsedTime(elapsed);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [activeEntry, timeEntries]);

  const handleStart = async () => {
    if (!task.trim()) return;
    
    try {
      const entry = await startTimeTracking(projectId, task);
      setActiveEntry(entry.id);
      setTask('');
    } catch (error) {
      console.error('Failed to start time tracking:', error);
    }
  };

  const handleStop = async () => {
    if (!activeEntry) return;
    
    try {
      await stopTimeTracking(activeEntry);
      setActiveEntry(null);
      setElapsedTime(0);
    } catch (error) {
      console.error('Failed to stop time tracking:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Time Tracker
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What are you working on?"
            disabled={!!activeEntry}
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
          />
          {activeEntry ? (
            <button
              onClick={handleStop}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop
            </button>
          ) : (
            <button
              onClick={handleStart}
              disabled={!task.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </button>
          )}
        </div>

        {activeEntry && (
          <div className="text-center">
            <div className="text-3xl font-mono text-indigo-600 dark:text-indigo-400">
              {formatTime(elapsedTime)}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {timeEntries.find(e => e.id === activeEntry)?.task}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Recent Time Entries
          </h3>
          <div className="space-y-2">
            {timeEntries
              .filter(entry => entry.project_id === projectId)
              .slice(0, 5)
              .map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {entry.task}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(entry.start_time).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {entry.end_time ? formatTime(entry.duration) : 'In Progress'}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```