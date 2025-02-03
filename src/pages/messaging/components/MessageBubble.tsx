import React from 'react';
import { FileText } from 'lucide-react';
import type { Message } from '../../../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isOwn ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800'} rounded-lg shadow px-4 py-2`}>
        <div className="text-sm mb-1">
          {!isOwn && (
            <span className="font-medium text-gray-900 dark:text-white">
              {message.sender.full_name}
            </span>
          )}
          <span className={`text-xs ${isOwn ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'} ml-2`}>
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>
        <p className={isOwn ? 'text-white' : 'text-gray-900 dark:text-white'}>
          {message.message_text}
        </p>
        {message.attachments?.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((attachment) => (
              <a
                key={attachment.id}
                href={attachment.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 text-sm ${
                  isOwn ? 'text-indigo-200 hover:text-white' : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>{attachment.file_name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}