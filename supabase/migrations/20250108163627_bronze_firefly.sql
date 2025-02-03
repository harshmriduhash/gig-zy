-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow insert during signup" ON users;
    DROP POLICY IF EXISTS "Users can view all profiles" ON users;
    DROP POLICY IF EXISTS "Users can update their own profile" ON users;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Add policies
CREATE POLICY "Allow insert during signup" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view all profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);