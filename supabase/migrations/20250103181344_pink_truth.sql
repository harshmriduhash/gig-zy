/*
  # User Profiles Schema

  1. New Tables
    - `users`
      - Core user information and common fields
      - Links to auth.users
    - `freelancer_profiles`
      - Extended profile for freelancers
      - One-to-one relationship with users
    - `client_profiles`
      - Extended profile for clients
      - One-to-one relationship with users
    - `portfolio_items`
      - Portfolio entries for freelancers
    - `reviews`
      - Reviews for both freelancers and clients

  2. Security
    - Enable RLS on all tables
    - Policies for viewing and managing profiles
    - Separate policies for freelancer and client specific data

  3. Changes
    - Added user verification status
    - Added rating calculations
    - Added portfolio management
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  location text,
  rating numeric(3,2) CHECK (rating >= 0 AND rating <= 5),
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create freelancer_profiles table
CREATE TABLE IF NOT EXISTS freelancer_profiles (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  skills text[] DEFAULT '{}',
  experience text,
  hourly_rate numeric(10,2),
  fixed_rate numeric(10,2),
  total_earnings numeric(12,2) DEFAULT 0,
  jobs_completed integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create client_profiles table
CREATE TABLE IF NOT EXISTS client_profiles (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  company_name text,
  company_description text,
  total_spent numeric(12,2) DEFAULT 0,
  projects_posted integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id uuid REFERENCES freelancer_profiles(user_id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  image_urls text[] DEFAULT '{}',
  project_url text,
  technologies text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id uuid REFERENCES users(id) ON DELETE CASCADE,
  project_id uuid, -- Will be linked to projects table later
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(reviewer_id, reviewee_id, project_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Freelancer profiles policies
CREATE POLICY "Anyone can view freelancer profiles"
  ON freelancer_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Freelancers can update their own profile"
  ON freelancer_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Client profiles policies
CREATE POLICY "Anyone can view client profiles"
  ON client_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can update their own profile"
  ON client_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Portfolio items policies
CREATE POLICY "Anyone can view portfolio items"
  ON portfolio_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Freelancers can manage their portfolio items"
  ON portfolio_items FOR ALL
  TO authenticated
  USING (auth.uid() = freelancer_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for completed projects"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = reviewer_id
    -- Additional check for project completion will be added later
  );

-- Create functions for rating calculations
CREATE OR REPLACE FUNCTION calculate_user_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM reviews
    WHERE reviewee_id = NEW.reviewee_id
  )
  WHERE id = NEW.reviewee_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for rating updates
CREATE TRIGGER update_user_rating
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION calculate_user_rating();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_rating ON users(rating);
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_skills ON freelancer_profiles USING gin(skills);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_technologies ON portfolio_items USING gin(technologies);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);