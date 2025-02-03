import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase/client';

interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  user_id: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Delete all messages for the current user
      const { error: deleteError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Clear local messages
      setMessages([]);
    } catch (err) {
      console.error('Failed to clear chat history:', err);
      setError(err instanceof Error ? err : new Error('Failed to clear chat history'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    clearHistory
  };
}