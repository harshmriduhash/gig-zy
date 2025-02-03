import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { ProjectsList } from './components/dashboard/ProjectsList';
import { BidsList } from './components/dashboard/BidsList';
import { MilestonesList } from './components/dashboard/MilestonesList';
import { useClientDashboard } from '../../hooks/useClientDashboard';
import { useClientProjects } from '../../hooks/useClientProjects';
import { PrivateRoute } from '../../components/auth/PrivateRoute';

export function ProjectDashboardPage() {
  const { stats, isLoading: isLoadingStats, error: statsError } = useClientDashboard();
  const { projects, bids, milestones, isLoading, error } = useClientProjects();

  return (
    <PrivateRoute requiredPermissions={['project.view']}>
      <Layout>
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardStats 
            stats={stats}
            isLoading={isLoadingStats}
            error={statsError}
          />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectsList 
              projects={projects}
              isLoading={isLoading}
              error={error}
            />
            <BidsList 
              bids={bids}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div className="mt-8">
            <MilestonesList 
              milestones={milestones}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}

// Also export as ClientDashboardPage for consistency
export { ProjectDashboardPage as ClientDashboardPage };