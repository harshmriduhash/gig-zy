import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface RealtimeStatusProps {
  isConnected: boolean;
  error: Error | null;
  retryCount: number;
  onRetry: () => void;
}

export function RealtimeStatus({ isConnected, error, retryCount, onRetry }: RealtimeStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      {isConnected ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-500">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-500">Disconnected</span>
          {error && (
            <span className="text-sm text-red-500">
              ({error.message})
            </span>
          )}
          {retryCount > 0 && (
            <span className="text-sm text-gray-500">
              Retry {retryCount}
            </span>
          )}
          <button
            onClick={onRetry}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>
        </>
      )}
    </div>
  );
}