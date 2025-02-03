import { supabase } from './client';
import type { Role, Permission } from './types';

export async function getRolePermissions(roleId: string): Promise<Permission[]> {
  const { data, error } = await supabase
    .from('role_permissions')
    .select(`
      permissions (
        id,
        name,
        description
      )
    `)
    .eq('role_id', roleId);

  if (error) throw error;
  return data.map(item => item.permissions);
}

export async function assignUserRole(userId: string, userType: 'freelancer' | 'client') {
  // First get the role id for the user type
  const { data: role, error: roleError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', userType)
    .single();

  if (roleError) throw roleError;

  // Then assign the role to the user
  const { error } = await supabase
    .from('user_roles')
    .insert({
      user_id: userId,
      role_id: role.id
    });

  if (error) throw error;
}

export async function getUserRoles(userId: string): Promise<Role[]> {
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      roles (
        id,
        name,
        description
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data.map(item => item.roles);
}