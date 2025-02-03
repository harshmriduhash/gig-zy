/*
  # Projects Schema

  1. New Tables
    - `projects`
      - Core project information
      - Links to client profiles
      - Status management
      - Budget and timeline tracking
    - `project_attachments`
      - File attachments for projects
    - `project_skills`
      - Required skills/categories for projects

  2. Security
    - Enable RLS on all tables
    - Policies for viewing public projects
    - Specific policies for client project management
    - Attachment access control

  3. Features
    - Project status management
    - Budget range validation
    - Timeline tracking
    - File attachment system
*/

-- Create enum for project status
CREATE TYPE project_status AS ENUM (
  'draft',
  'open',
  'in_progress',
  'completed',
  'closed'
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES client_profiles(user_id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  budget_min numeric(10,2),
  budget_max numeric(10,2),
  required_skills text[] DEFAULT '{}',
  status project_status DEFAULT 'draft',
  deadline timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Add budget range validation
  CONSTRAINT valid_budget_range 
    CHECK (budget_max >= budget_min),
  
  -- Ensure deadline is in the future
  CONSTRAINT future_deadline 
    CHECK (deadline > created_at)
);

-- Create project attachments table
CREATE TABLE IF NOT EXISTS project_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size integer,
  uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_attachments ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  TO authenticated
  USING (status = 'open');

CREATE POLICY "Clients can view all their own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (client_id IN (
    SELECT user_id FROM client_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM client_profiles
  ));

CREATE POLICY "Clients can update their own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (client_id IN (
    SELECT user_id FROM client_profiles WHERE user_id = auth.uid()
  ));

-- Project attachments policies
CREATE POLICY "Project attachments are viewable by project viewers"
  ON project_attachments FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE 
        status = 'open' OR
        client_id IN (SELECT user_id FROM client_profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Clients can manage their project attachments"
  ON project_attachments FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE 
        client_id IN (SELECT user_id FROM client_profiles WHERE user_id = auth.uid())
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_required_skills ON projects USING gin(required_skills);
CREATE INDEX IF NOT EXISTS idx_project_attachments_project_id ON project_attachments(project_id);

-- Create function to update project timestamp
CREATE OR REPLACE FUNCTION update_project_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_project_modified
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_project_timestamp();

-- Create function to validate project status transitions
CREATE OR REPLACE FUNCTION validate_project_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow specific status transitions
  IF OLD.status = 'draft' AND NEW.status NOT IN ('open', 'closed') THEN
    RAISE EXCEPTION 'Invalid status transition from draft';
  ELSIF OLD.status = 'open' AND NEW.status NOT IN ('in_progress', 'closed') THEN
    RAISE EXCEPTION 'Invalid status transition from open';
  ELSIF OLD.status = 'in_progress' AND NEW.status NOT IN ('completed', 'closed') THEN
    RAISE EXCEPTION 'Invalid status transition from in_progress';
  ELSIF OLD.status = 'completed' AND NEW.status != 'closed' THEN
    RAISE EXCEPTION 'Completed projects can only be closed';
  ELSIF OLD.status = 'closed' THEN
    RAISE EXCEPTION 'Closed projects cannot change status';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status transitions
CREATE TRIGGER validate_project_status
  BEFORE UPDATE OF status ON projects
  FOR EACH ROW
  EXECUTE FUNCTION validate_project_status_transition();