import { supabase } from '../client';
import type { SignInData } from '../types';

export async function signIn({ email, password }: SignInData) {
  try {
    // First attempt to sign in
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) throw signInError;

    // If sign in successful, get the user's role
    if (authData.user) {
      const { data: roleData, error: roleError } = await supabase
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
        .eq('user_id', authData.user.id)
        .single();

      if (roleError) {
        console.error('Error fetching role:', roleError);
        return { data: authData, error: null }; // Still return auth data even if role fetch fails
      }

      // Extract permissions from role data
      const permissions = roleData?.role?.permissions?.map(p => p.permission.name) || [];

      return {
        data: {
          ...authData,
          role: roleData?.role?.name,
          permissions
        },
        error: null
      };
    }

    return { data: authData, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Failed to sign in') };
  }
}