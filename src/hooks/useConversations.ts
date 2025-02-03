import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { Conversation } from '../types';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            participants:conversation_participants (
              user:user_id (
                id,
                full_name,
                avatar_url
              ),
              last_read_at
            ),
            latest_message:messages (
              message_text,
              created_at,
              sender:sender_id (
                full_name
              )
            )
          `)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setConversations(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch conversations'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();

    // Subscribe to conversation updates
    const subscription = supabase
      .channel('conversations')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'conversations'
      }, fetchConversations)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { conversations, isLoading, error };
}