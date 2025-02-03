import { useAuth } from '../contexts/AuthContext';

export function usePermissions() {
  const { hasPermission, permissions } = useAuth();

  const can = {
    createProject: () => hasPermission('project.create'),
    updateProject: () => hasPermission('project.update'),
    deleteProject: () => hasPermission('project.delete'),
    viewProject: () => hasPermission('project.view'),
    
    createBid: () => hasPermission('bid.create'),
    updateBid: () => hasPermission('bid.update'),
    deleteBid: () => hasPermission('bid.delete'),
    viewBid: () => hasPermission('bid.view'),
    
    manageUsers: () => hasPermission('admin.users'),
    manageRoles: () => hasPermission('admin.roles'),
    manageSystem: () => hasPermission('admin.system')
  };

  return { can, permissions };
}