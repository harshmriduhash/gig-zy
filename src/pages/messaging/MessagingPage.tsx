import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { ConversationList } from './components/ConversationList';
import { MessageThread } from './components/MessageThread';
import { ChatHeader } from '../../components/chat/ChatHeader';
import { MessageInput } from '../../components/messaging/MessageInput';
import { useConversations } from '../../hooks/useConversations';
import { useMessages } from '../../hooks/useMessages';

export function MessagingPage() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const { conversations, isLoading: isLoadingConversations, error: conversationsError } = useConversations();
  const { messages, isLoading: isLoadingMessages, error: messagesError, sendMessage } = useMessages(activeConversationId);

  const participantCount = messages.reduce((count, message) => {
    const senderId = message.sender_id;
    return count.includes(senderId) ? count : [...count, senderId];
  }, [] as string[]).length;

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex">
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
          <ConversationList
            conversations={conversations}
            isLoading={isLoadingConversations}
            error={conversationsError}
            activeId={activeConversationId}
            onSelect={setActiveConversationId}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <ChatHeader participantCount={participantCount} />
          <div className="flex-1 overflow-y-auto">
            <MessageThread
              messages={messages}
              isLoading={isLoadingMessages}
              error={messagesError}
            />
          </div>
          <MessageInput onSend={sendMessage} />
        </div>
      </div>
    </Layout>
  );
}