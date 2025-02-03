import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

async function setupAdminUser() {
  try {
    // First try to sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@test.com',
      password: 'Admin123!'
    });

    if (!signInError) {
      console.log('Admin user already exists and credentials are valid');
      return { success: true, message: 'Admin user already exists' };
    }

    // If sign in fails, create new admin user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@test.com',
      password: 'Admin123!',
      options: {
        data: {
          full_name: 'Admin User'
        }
      }
    });

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        console.log('Admin user exists but password may be incorrect');
        return { success: false, error: signUpError };
      }
      throw signUpError;
    }

    if (!authData.user) throw new Error('No user data returned');

    console.log('Admin user created successfully');

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        full_name: 'Admin User',
        email: 'admin@test.com',
        is_verified: true
      });

    if (profileError) {
      if (!profileError.message.includes('duplicate key')) {
        throw profileError;
      }
      console.log('Admin profile already exists');
    } else {
      console.log('Admin profile created successfully');
    }

    // Get admin role ID
    const { data: adminRole, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'admin')
      .single();

    if (roleError) throw roleError;
    if (!adminRole) throw new Error('Admin role not found');

    console.log('Found admin role:', adminRole.id);

    // Assign admin role to user
    const { error: assignError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role_id: adminRole.id
      });

    if (assignError) {
      if (!assignError.message.includes('duplicate key')) {
        throw assignError;
      }
      console.log('Admin role already assigned');
    } else {
      console.log('Admin role assigned successfully');
    }

    return { success: true, message: 'Admin user created and configured successfully' };
  } catch (error) {
    console.error('Error setting up admin user:', error);
    return { success: false, error };
  }
}

// Run setup
setupAdminUser()
  .then(result => {
    if (result.success) {
      console.log('Setup complete:', result.message);
      process.exit(0);
    } else {
      console.error('Setup failed:', result.error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Setup failed:', err);
    process.exit(1);
  });