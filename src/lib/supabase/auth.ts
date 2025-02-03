import { supabase } from './client';
import { createUserProfile } from './profile';
import { assignUserRole } from './roles';
import type { SignUpData, SignInData } from './types';

export async function signUp({ email, password, fullName, userType }: SignUpData) {
  try {
    // 1. Create auth user
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

    // 2. Create user profile
    await createUserProfile(authData.user.id, fullName, email, userType);
    
    // 3. Assign role
    await assignUserRole(authData.user.id, userType);

    return authData;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signIn({ email, password }: SignInData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}