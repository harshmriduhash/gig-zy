import React, { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "../messaging/MessageInput";
import { MessageThread } from "../messaging/MessageThread";
import { useMessages } from "../../hooks/useMessages";

interface ChatInterfaceProps {
  conversationId: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const [showSettings, setShowSettings] = useState(false);
  const { messages, isLoading, error, sendMessage } =
    useMessages(conversationId);

  const participantCount = messages.reduce((count, message) => {
    const senderId = message.sender_id;
    return count.includes(senderId) ? count : [...count, senderId];
  }, [] as string[]).length;

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        participantCount={participantCount}
        onSettingsClick={() => setShowSettings(!showSettings)}
      />

      <div className="flex-1 overflow-y-auto">
        <MessageThread
          messages={messages}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}
