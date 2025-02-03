import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { User } from '../types';

interface UserFilters {
  role: string;
  status: string;
  verified: string;
}

export function useUsers(filters: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        let query = supabase
          .from('users')
          .select(`
            *,
            roles (
              name
            )
          `)
          .order('created_at', { ascending: false });

        if (filters.role !== 'all') {
          query = query.eq('roles.name', filters.role);
        }
        if (filters.status !== 'all') {
          query = query.eq('status', filters.status);
        }
        if (filters.verified !== 'all') {
          query = query.eq('is_verified', filters.verified === 'verified');
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [filters]);

  const updateUserStatus = async (userId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ status })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update user status');
    }
  };

  return { users, isLoading, error, updateUserStatus };
}