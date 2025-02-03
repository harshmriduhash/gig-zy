/*
  # Initial Roles and Permissions Data

  1. Insert default roles
    - Freelancer
    - Client
    - Admin

  2. Insert basic permissions
    - Project management permissions
    - Profile management permissions
    - Admin permissions
*/

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('freelancer', 'Can create profiles, bid on projects, and manage their services'),
  ('client', 'Can post projects, hire freelancers, and manage their projects'),
  ('admin', 'Full system access and management capabilities')
ON CONFLICT (name) DO NOTHING;

-- Insert basic permissions
INSERT INTO permissions (name, description) VALUES
  -- Project permissions
  ('project.create', 'Can create new projects'),
  ('project.update', 'Can update project details'),
  ('project.delete', 'Can delete projects'),
  ('project.view', 'Can view project details'),
  
  -- Bid permissions
  ('bid.create', 'Can create bids on projects'),
  ('bid.update', 'Can update own bids'),
  ('bid.delete', 'Can delete own bids'),
  ('bid.view', 'Can view bids'),
  
  -- Profile permissions
  ('profile.create', 'Can create profile'),
  ('profile.update', 'Can update own profile'),
  ('profile.delete', 'Can delete own profile'),
  ('profile.view', 'Can view profiles'),
  
  -- Admin permissions
  ('admin.users', 'Can manage users'),
  ('admin.roles', 'Can manage roles and permissions'),
  ('admin.projects', 'Can manage all projects'),
  ('admin.system', 'Can manage system settings')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to roles
WITH role_data AS (
  SELECT id, name FROM roles
),
permission_data AS (
  SELECT id, name FROM permissions
)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  r.id,
  p.id
FROM role_data r
CROSS JOIN permission_data p
WHERE 
  (r.name = 'freelancer' AND p.name IN (
    'project.view',
    'bid.create',
    'bid.update',
    'bid.delete',
    'bid.view',
    'profile.create',
    'profile.update',
    'profile.delete',
    'profile.view'
  ))
  OR
  (r.name = 'client' AND p.name IN (
    'project.create',
    'project.update',
    'project.delete',
    'project.view',
    'bid.view',
    'profile.create',
    'profile.update',
    'profile.delete',
    'profile.view'
  ))
  OR
  (r.name = 'admin' AND p.name LIKE 'admin.%')
ON CONFLICT (role_id, permission_id) DO NOTHING;