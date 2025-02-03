/*
  # Milestones Schema

  1. New Tables
    - `milestones` - Track project milestones and payments
      - Status workflow: not_started -> in_progress -> completed -> approved
      - Payment validation against total bid amount
      - Freelancer assignment validation

  2. Security
    - RLS policies for milestone access and updates
    - Status transition validation
    - Amount validation against accepted bid
*/

-- Create enum for milestone status
CREATE TYPE milestone_status AS ENUM (
  'not_started',
  'in_progress',
  'completed',
  'approved'
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES freelancer_profiles(user_id) ON DELETE CASCADE,
  description text NOT NULL,
  due_date timestamptz NOT NULL,
  amount numeric(10,2) NOT NULL,
  status milestone_status DEFAULT 'not_started',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Ensure amount is positive
  CONSTRAINT positive_milestone_amount 
    CHECK (amount > 0),
  
  -- Ensure due date is in the future
  CONSTRAINT future_due_date 
    CHECK (due_date > created_at)
);

-- Enable Row Level Security
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Milestone policies
CREATE POLICY "Assigned freelancers can view their milestones"
  ON milestones FOR SELECT
  TO authenticated
  USING (freelancer_id = auth.uid());

CREATE POLICY "Project owners can view project milestones"
  ON milestones FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Project owners can manage milestones"
  ON milestones FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can update milestone status"
  ON milestones FOR UPDATE
  TO authenticated
  USING (
    freelancer_id = auth.uid() AND
    status IN ('not_started', 'in_progress')
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_freelancer_id ON milestones(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_milestones_status ON milestones(status);

-- Create function to update milestone timestamp
CREATE OR REPLACE FUNCTION update_milestone_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_milestone_modified
  BEFORE UPDATE ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_milestone_timestamp();

-- Create function to validate milestone freelancer
CREATE OR REPLACE FUNCTION validate_milestone_freelancer()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM bids 
    WHERE project_id = NEW.project_id 
    AND freelancer_id = NEW.freelancer_id 
    AND status = 'accepted'
  ) THEN
    RAISE EXCEPTION 'Freelancer must have an accepted bid for this project';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for freelancer validation
CREATE TRIGGER validate_milestone_freelancer
  BEFORE INSERT OR UPDATE OF freelancer_id ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION validate_milestone_freelancer();

-- Create function to validate milestone status transitions
CREATE OR REPLACE FUNCTION validate_milestone_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent changes to non-status fields during status update
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    IF OLD.amount != NEW.amount OR OLD.due_date != NEW.due_date THEN
      RAISE EXCEPTION 'Cannot modify amount or due date during status update';
    END IF;
    
    -- Validate status transitions
    IF OLD.status = 'not_started' AND NEW.status != 'in_progress' THEN
      RAISE EXCEPTION 'Not started milestones can only move to in progress';
    ELSIF OLD.status = 'in_progress' AND NEW.status != 'completed' THEN
      RAISE EXCEPTION 'In progress milestones can only move to completed';
    ELSIF OLD.status = 'completed' AND NEW.status != 'approved' THEN
      RAISE EXCEPTION 'Completed milestones can only be approved';
    ELSIF OLD.status = 'approved' THEN
      RAISE EXCEPTION 'Approved milestones cannot change status';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status transitions
CREATE TRIGGER validate_milestone_status
  BEFORE UPDATE ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION validate_milestone_status_transition();

-- Create function to validate total milestone amounts
CREATE OR REPLACE FUNCTION validate_milestone_amounts()
RETURNS TRIGGER AS $$
DECLARE
  total_amount numeric;
  bid_amount numeric;
BEGIN
  -- Calculate total milestone amounts
  SELECT COALESCE(SUM(amount), 0) INTO total_amount
  FROM milestones
  WHERE project_id = NEW.project_id
  AND id != NEW.id;

  -- Get accepted bid amount
  SELECT amount INTO bid_amount
  FROM bids
  WHERE project_id = NEW.project_id
  AND status = 'accepted';

  -- Validate total doesn't exceed bid amount
  IF (total_amount + NEW.amount) > bid_amount THEN
    RAISE EXCEPTION 'Total milestone amounts cannot exceed accepted bid amount';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for amount validation
CREATE TRIGGER validate_milestone_amount
  BEFORE INSERT OR UPDATE OF amount ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION validate_milestone_amounts();