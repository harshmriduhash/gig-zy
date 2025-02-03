import React from 'react';
import { MoreVertical, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { UserActions } from './UserActions';
import type { User } from '../../../../types';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  onUpdateStatus: (userId: string, status: string) => Promise<void>;
}

export function UserList({ users, isLoading, error, onUpdateStatus }: UserListProps) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading users: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
            <div className="ml-4 flex-1">
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="mt-2 h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Joined
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}`}
                      alt={user.full_name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.full_name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {user.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : user.status === 'suspended' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className={`capitalize ${
                    user.status === 'active' 
                      ? 'text-green-800 dark:text-green-200'
                      : user.status === 'suspended'
                      ? 'text-yellow-800 dark:text-yellow-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {activeMenu === user.id && (
                    <UserActions
                      user={user}
                      onClose={() => setActiveMenu(null)}
                      onUpdateStatus={onUpdateStatus}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}