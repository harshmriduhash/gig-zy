import { supabase } from './client';

export async function createUserProfile(
  userId: string, 
  fullName: string, 
  email: string,
  userType: 'freelancer' | 'client'
) {
  // Create base user profile
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: userId,
      full_name: fullName,
      email,
      is_verified: false
    });

  if (profileError) throw profileError;

  // Create type-specific profile
  const { error: typeError } = await supabase
    .from(userType === 'freelancer' ? 'freelancer_profiles' : 'client_profiles')
    .insert({ 
      user_id: userId
    });

  if (typeError) throw typeError;
}