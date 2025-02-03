import React from 'react';
import { MessageSquare, Users, Settings } from 'lucide-react';
import { ClearHistoryButton } from './ClearHistoryButton';
import { useAuth } from '../../contexts/AuthContext';

interface ChatHeaderProps {
  participantCount?: number;
  onSettingsClick?: () => void;
}

export function ChatHeader({ participantCount, onSettingsClick }: ChatHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h1 className="text-lg font-medium text-gray-900 dark:text-white">
                Chat
              </h1>
            </div>
            {participantCount !== undefined && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                {participantCount} {participantCount === 1 ? 'participant' : 'participants'}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <ClearHistoryButton />
            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Chat Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}