import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { ActiveBids } from './components/dashboard/ActiveBids';
import { ActiveContracts } from './components/dashboard/ActiveContracts';
import { RecentEarnings } from './components/dashboard/RecentEarnings';
import { useBids } from '../../hooks/useBids';
import { useContracts } from '../../hooks/useContracts';
import { useFreelancerDashboard } from '../../hooks/useFreelancerDashboard';
import { PrivateRoute } from '../../components/auth/PrivateRoute';

export function DashboardPage() {
  const { bids, isLoadingBids, bidsError } = useBids();
  const { contracts, isLoadingContracts, contractsError } = useContracts();
  const { stats, isLoading: isLoadingStats, error: statsError } = useFreelancerDashboard();

  return (
    <PrivateRoute requiredPermissions={['profile.view']}>
      <Layout>
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardStats 
            stats={stats}
            isLoading={isLoadingStats}
            error={statsError}
          />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActiveBids 
              bids={bids} 
              isLoading={isLoadingBids} 
              error={bidsError} 
            />
            <ActiveContracts 
              contracts={contracts} 
              isLoading={isLoadingContracts} 
              error={contractsError} 
            />
          </div>
          <div className="mt-8">
            <RecentEarnings />
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}

// Also export as FreelancerDashboardPage for consistency
export { DashboardPage as FreelancerDashboardPage };