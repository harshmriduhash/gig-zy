import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  permissions: string[];
  signIn: (email: string, password: string) => Promise<{ data: any; error: Error | null }>;
  signOut: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await loadUserPermissions(session.user.id);
          }
        }
      } catch (err) {
        console.error('Session error:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Session error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadUserPermissions(session.user.id);
        } else {
          setPermissions([]);
        }
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadUserPermissions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          role:role_id (
            name,
            permissions:role_permissions (
              permission:permission_id (
                name
              )
            )
          )
        `)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      const perms = data?.role?.permissions?.map(rp => rp.permission?.name) || [];
      setPermissions(perms.filter(Boolean));
      
      return data?.role?.name;
    } catch (err) {
      console.error('Error loading permissions:', err);
      setPermissions([]);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        const role = await loadUserPermissions(data.user.id);
        return { data: { ...data, role }, error: null };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Sign in error:', err);
      return { data: null, error: err instanceof Error ? err : new Error('Failed to sign in') };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setPermissions([]);
    } catch (err) {
      console.error('Sign out error:', err);
      throw err;
    }
  };

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      error,
      permissions,
      signIn, 
      signOut, 
      hasPermission 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}