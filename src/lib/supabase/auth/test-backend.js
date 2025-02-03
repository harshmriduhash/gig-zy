import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testBackend() {
  console.log('Testing backend connectivity...');

  try {
    // Test database connection
    const { data: dbTest, error: dbError } = await supabase
      .from('roles')
      .select('name')
      .limit(1);

    if (dbError) throw dbError;
    console.log('Database connection: ✅');
    console.log('Available roles:', dbTest);

    // Test authentication
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@test.com',
      password: 'Admin123!'
    });

    if (authError) throw authError;
    console.log('Authentication: ✅');
    console.log('User:', authData.user?.email);

    // Test role-based access
    if (authData.user) {
      const { data: userRole, error: roleError } = await supabase
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

      if (roleError) throw roleError;
      console.log('Role access: ✅');
      console.log('User role:', userRole?.role?.name);
      console.log('Permissions:', userRole?.role?.permissions?.map(p => p.permission.name));
    }

  } catch (error) {
    console.error('Backend test failed:', error);
  }
}

testBackend();