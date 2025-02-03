import React from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export function ProfileHeader() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 rounded-full bg-indigo-600 p-1.5 text-white shadow-sm">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user?.full_name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}