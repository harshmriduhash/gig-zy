import React from 'react';
import { MilestoneCard } from './MilestoneCard';
import { LoadingMilestoneCard } from './LoadingMilestoneCard';
import type { Milestone } from '../../../../types';

interface MilestonesListProps {
  milestones: Milestone[];
  isLoading: boolean;
  error?: Error | null;
}

export function MilestonesList({ milestones, isLoading, error }: MilestonesListProps) {
  const activeMilestones = milestones.filter(m => 
    ['not_started', 'in_progress'].includes(m.status)
  );

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Active Milestones
      </h2>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-300">
            Error loading milestones: {error.message}
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <LoadingMilestoneCard key={i} />
          ))}
        </div>
      ) : activeMilestones.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No active milestones at the moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeMilestones.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      )}
    </section>
  );
}