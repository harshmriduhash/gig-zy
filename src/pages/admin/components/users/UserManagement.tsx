import React from 'react';
import { UserList } from './UserList';
import { UserFilters } from './UserFilters';
import { useUsers } from '../../../../hooks/useUsers';

export function UserManagement() {
  const [filters, setFilters] = React.useState({
    role: 'all',
    status: 'all',
    verified: 'all'
  });

  const { users, isLoading, error, updateUserStatus } = useUsers(filters);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            User Management
          </h2>
          <UserFilters filters={filters} onChange={setFilters} />
        </div>
        <UserList 
          users={users}
          isLoading={isLoading}
          error={error}
          onUpdateStatus={updateUserStatus}
        />
      </div>
    </div>
  );
}