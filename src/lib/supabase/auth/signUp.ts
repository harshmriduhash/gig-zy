import { supabase } from '../client';
import { createUserProfile } from '../profile';
import { assignUserRole } from '../roles';
import type { SignUpData } from '../types';

export async function signUp({ email, password, fullName, userType }: SignUpData) {
  try {
    // First check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user data returned');

    // Create user profile
    await createUserProfile(authData.user.id, fullName, email, userType);
    
    // Assign role
    await assignUserRole(authData.user.id, userType);

    return { data: authData, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Failed to sign up')
    };
  }
}