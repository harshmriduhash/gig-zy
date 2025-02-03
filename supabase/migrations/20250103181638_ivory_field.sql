/*
  # Bids Schema

  1. New Tables
    - `bids`
      - Links to projects and freelancers
      - Bid amount and timeline tracking
      - Status management
      - Cover note/proposal storage

  2. Security
    - Enable RLS
    - Policies for bid visibility
    - Bid management permissions
    - Status transition controls

  3. Features
    - Bid status management
    - Amount validation
    - Timeline tracking
    - Automatic timestamps
*/

-- Create enum for bid status
CREATE TYPE bid_status AS ENUM (
  'pending',
  'shortlisted',
  'accepted',
  'rejected'
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES freelancer_profiles(user_id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  proposed_timeline timestamptz NOT NULL,
  cover_note text,
  status bid_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Ensure amount is positive
  CONSTRAINT positive_amount 
    CHECK (amount > 0),
  
  -- Ensure timeline is in the future
  CONSTRAINT future_timeline 
    CHECK (proposed_timeline > created_at),
    
  -- One bid per freelancer per project
  CONSTRAINT one_bid_per_freelancer_project 
    UNIQUE (project_id, freelancer_id)
);

-- Enable Row Level Security
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Bid policies
CREATE POLICY "Freelancers can view their own bids"
  ON bids FOR SELECT
  TO authenticated
  USING (freelancer_id IN (
    SELECT user_id FROM freelancer_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Project owners can view all bids for their projects"
  ON bids FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE client_id IN (
        SELECT user_id FROM client_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Freelancers can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (SELECT user_id FROM freelancer_profiles) AND
    project_id IN (SELECT id FROM projects WHERE status = 'open')
  );

CREATE POLICY "Freelancers can update their pending bids"
  ON bids FOR UPDATE
  TO authenticated
  USING (
    freelancer_id IN (
      SELECT user_id FROM freelancer_profiles WHERE user_id = auth.uid()
    ) AND
    status = 'pending'
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bids_project_id ON bids(project_id);
CREATE INDEX IF NOT EXISTS idx_bids_freelancer_id ON bids(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);

-- Create function to update bid timestamp
CREATE OR REPLACE FUNCTION update_bid_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_bid_modified
  BEFORE UPDATE ON bids
  FOR EACH ROW
  EXECUTE FUNCTION update_bid_timestamp();

-- Create function to validate bid status transitions
CREATE OR REPLACE FUNCTION validate_bid_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow specific status transitions
  IF OLD.status = 'pending' AND NEW.status NOT IN ('shortlisted', 'rejected') THEN
    RAISE EXCEPTION 'Invalid status transition from pending';
  ELSIF OLD.status = 'shortlisted' AND NEW.status NOT IN ('accepted', 'rejected') THEN
    RAISE EXCEPTION 'Invalid status transition from shortlisted';
  ELSIF OLD.status IN ('accepted', 'rejected') THEN
    RAISE EXCEPTION 'Final bid status cannot be changed';
  END IF;
  
  -- Ensure only one bid can be accepted per project
  IF NEW.status = 'accepted' THEN
    IF EXISTS (
      SELECT 1 FROM bids 
      WHERE project_id = NEW.project_id 
      AND status = 'accepted'
      AND id != NEW.id
    ) THEN
      RAISE EXCEPTION 'Project already has an accepted bid';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status transitions
CREATE TRIGGER validate_bid_status
  BEFORE UPDATE OF status ON bids
  FOR EACH ROW
  EXECUTE FUNCTION validate_bid_status_transition();