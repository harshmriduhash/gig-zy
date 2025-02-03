-- Drop all existing policies first
DROP POLICY IF EXISTS "Roles are viewable by authenticated users" ON roles;
DROP POLICY IF EXISTS "Permissions are viewable by authenticated users" ON permissions;
DROP POLICY IF EXISTS "Role permissions are viewable by authenticated users" ON role_permissions;
DROP POLICY IF EXISTS "Users can view their own roles" ON user_roles;
DROP POLICY IF EXISTS "Allow insert during signup" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage all user roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;
DROP POLICY IF EXISTS "Public read access" ON roles;
DROP POLICY IF EXISTS "Public read access" ON permissions;
DROP POLICY IF EXISTS "Public read access" ON role_permissions;
DROP POLICY IF EXISTS "Users can view own roles" ON user_roles;
DROP POLICY IF EXISTS "Allow signup role assignment" ON user_roles;
DROP POLICY IF EXISTS "Admin role management" ON user_roles;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Create roles table
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create permissions table
CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create role_permissions junction table
CREATE TABLE role_permissions (
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Create user_roles junction table
CREATE TABLE user_roles (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Enable Row Level Security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create base policies for authenticated users
CREATE POLICY "Authenticated read access"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated read access"
  ON permissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated read access"
  ON role_permissions FOR SELECT
  TO authenticated
  USING (true);

-- Create user_roles policies
CREATE POLICY "Basic read access"
  ON user_roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own roles"
  ON user_roles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create admin management policy using a security definer function
CREATE OR REPLACE FUNCTION check_admin_role(check_user_id uuid)
RETURNS boolean
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM roles r
    JOIN user_roles ur ON ur.role_id = r.id
    WHERE ur.user_id = check_user_id
    AND r.name = 'admin'
  );
END;
$$;

CREATE POLICY "Admin role management"
  ON user_roles FOR ALL
  TO authenticated
  USING (
    check_admin_role(auth.uid())
  );

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full system access and management capabilities'),
  ('freelancer', 'Can create profiles, bid on projects, and manage their services'),
  ('client', 'Can post projects, hire freelancers, and manage their projects')
ON CONFLICT (name) DO NOTHING;

-- Insert basic permissions
INSERT INTO permissions (name, description) VALUES
  ('project.create', 'Can create new projects'),
  ('project.update', 'Can update project details'),
  ('project.delete', 'Can delete projects'),
  ('project.view', 'Can view project details'),
  ('bid.create', 'Can create bids on projects'),
  ('bid.update', 'Can update own bids'),
  ('bid.delete', 'Can delete own bids'),
  ('bid.view', 'Can view bids'),
  ('profile.create', 'Can create profile'),
  ('profile.update', 'Can update own profile'),
  ('profile.delete', 'Can delete own profile'),
  ('profile.view', 'Can view profiles'),
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