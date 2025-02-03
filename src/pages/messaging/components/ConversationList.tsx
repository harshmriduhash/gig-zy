import React from 'react';
import { Search } from 'lucide-react';
import { ConversationItem } from './ConversationItem';
import { LoadingConversation } from './LoadingConversation';
import type { Conversation } from '../../../types';

interface ConversationListProps {
  conversations: Conversation[];
  isLoading: boolean;
  error?: Error | null;
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ 
  conversations, 
  isLoading, 
  error, 
  activeId, 
  onSelect 
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participants.some(p => 
      p.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {error ? (
          <div className="p-4 text-red-600 dark:text-red-400">
            Error loading conversations: {error.message}
          </div>
        ) : isLoading ? (
          <div className="space-y-1">
            {[...Array(5)].map((_, i) => (
              <LoadingConversation key={i} />
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No conversations found
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeId}
                onClick={() => onSelect(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}