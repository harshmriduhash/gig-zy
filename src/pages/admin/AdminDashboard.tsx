import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { AdminHeader } from './components/AdminHeader';
import { AdminStats } from './components/AdminStats';
import { AdminSidebar } from './components/AdminSidebar';
import { UserManagement } from './components/users/UserManagement';
import { ProjectManagement } from './components/projects/ProjectManagement';
import { DisputeManagement } from './components/disputes/DisputeManagement';
import { ContentList } from './components/cms/ContentList';
import { Analytics } from './components/analytics/Analytics';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { PrivateRoute } from '../../components/auth/PrivateRoute';

export function AdminDashboardPage() {
  const [activeSection, setActiveSection] = React.useState('users');
  const { stats, isLoading, error } = useAdminDashboard();

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'projects':
        return <ProjectManagement />;
      case 'disputes':
        return <DisputeManagement />;
      case 'content':
        return <ContentList />;
      case 'analytics':
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <PrivateRoute requiredPermissions={['admin.system']}>
      <Layout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AdminHeader />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminStats stats={stats} isLoading={isLoading} error={error} />
            <div className="mt-8 flex gap-8">
              <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
              <div className="flex-1">{renderSection()}</div>
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}