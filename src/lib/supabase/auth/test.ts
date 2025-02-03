import { supabase } from '../client';

// Test admin user
async function testAdminSignup() {
  const adminUser = {
    email: 'admin@test.com',
    password: 'Admin123!',
    fullName: 'Admin User',
    userType: 'admin' as const
  };

  const { data, error } = await supabase.auth.signUp({
    email: adminUser.email,
    password: adminUser.password,
    options: {
      data: {
        full_name: adminUser.fullName,
        user_type: adminUser.userType
      }
    }
  });

  console.log('Admin signup test:', error ? 'Failed' : 'Passed');
  return { data, error };
}

// Test freelancer user
async function testFreelancerSignup() {
  const freelancerUser = {
    email: 'freelancer@test.com',
    password: 'Freelancer123!',
    fullName: 'Freelancer User',
    userType: 'freelancer' as const
  };

  const { data, error } = await supabase.auth.signUp({
    email: freelancerUser.email,
    password: freelancerUser.password,
    options: {
      data: {
        full_name: freelancerUser.fullName,
        user_type: freelancerUser.userType
      }
    }
  });

  console.log('Freelancer signup test:', error ? 'Failed' : 'Passed');
  return { data, error };
}

// Test client/employer user
async function testClientSignup() {
  const clientUser = {
    email: 'client@test.com',
    password: 'Client123!',
    fullName: 'Client User',
    userType: 'client' as const
  };

  const { data, error } = await supabase.auth.signUp({
    email: clientUser.email,
    password: clientUser.password,
    options: {
      data: {
        full_name: clientUser.fullName,
        user_type: clientUser.userType
      }
    }
  });

  console.log('Client signup test:', error ? 'Failed' : 'Passed');
  return { data, error };
}

// Test role-based access
async function testRoleAccess() {
  // Test admin access
  const { data: adminData } = await supabase.auth.signInWithPassword({
    email: 'admin@test.com',
    password: 'Admin123!'
  });

  if (adminData.user) {
    const { data: adminCheck } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', adminData.user.id)
      .single();
    
    console.log('Admin role test:', adminCheck?.role_id === 'admin' ? 'Passed' : 'Failed');
  }

  // Test freelancer access
  const { data: freelancerData } = await supabase.auth.signInWithPassword({
    email: 'freelancer@test.com',
    password: 'Freelancer123!'
  });

  if (freelancerData.user) {
    const { data: freelancerProfile } = await supabase
      .from('freelancer_profiles')
      .select('*')
      .eq('user_id', freelancerData.user.id)
      .single();
    
    console.log('Freelancer profile test:', freelancerProfile ? 'Passed' : 'Failed');
  }

  // Test client access
  const { data: clientData } = await supabase.auth.signInWithPassword({
    email: 'client@test.com',
    password: 'Client123!'
  });

  if (clientData.user) {
    const { data: clientProfile } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', clientData.user.id)
      .single();
    
    console.log('Client profile test:', clientProfile ? 'Passed' : 'Failed');
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting authentication and role tests...');
  
  await testAdminSignup();
  await testFreelancerSignup();
  await testClientSignup();
  await testRoleAccess();
  
  console.log('Tests completed.');
}

export { runAllTests };