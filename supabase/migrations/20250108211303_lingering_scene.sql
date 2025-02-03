-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Content types are viewable by authenticated users" ON content_types;
  DROP POLICY IF EXISTS "Only admins can manage content types" ON content_types;
  DROP POLICY IF EXISTS "Published content is viewable by everyone" ON content_items;
  DROP POLICY IF EXISTS "Draft and archived content viewable by admins" ON content_items;
  DROP POLICY IF EXISTS "Only admins can manage content items" ON content_items;
  DROP POLICY IF EXISTS "Revisions are viewable by admins" ON content_revisions;
END $$;

-- Drop existing tables and types if they exist
DO $$ BEGIN
  DROP TABLE IF EXISTS content_revisions CASCADE;
  DROP TABLE IF EXISTS content_items CASCADE;
  DROP TABLE IF EXISTS content_types CASCADE;
  DROP TYPE IF EXISTS content_status;
END $$;

-- Create enum for content status
CREATE TYPE content_status AS ENUM (
  'draft',
  'published',
  'archived'
);

-- Create content_types table
CREATE TABLE IF NOT EXISTS content_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  fields jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_items table
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_id uuid REFERENCES content_types(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  status content_status DEFAULT 'draft',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(type_id, slug)
);

-- Create content_revisions table for version history
CREATE TABLE IF NOT EXISTS content_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content_items(id) ON DELETE CASCADE,
  content jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE content_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;

-- Create policies for content_types
CREATE POLICY "Content types are viewable by authenticated users"
  ON content_types FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage content types"
  ON content_types FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

-- Create policies for content_items
CREATE POLICY "Published content is viewable by everyone"
  ON content_items FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Draft and archived content viewable by admins"
  ON content_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

CREATE POLICY "Only admins can manage content items"
  ON content_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

-- Create policies for content_revisions
CREATE POLICY "Revisions are viewable by admins"
  ON content_revisions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_content_items_type ON content_items(type_id);
CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_content_items_slug ON content_items(slug);
CREATE INDEX IF NOT EXISTS idx_content_revisions_content ON content_revisions(content_id);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_content_types_timestamp
  BEFORE UPDATE ON content_types
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_content_items_timestamp
  BEFORE UPDATE ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert default content type for gigs
INSERT INTO content_types (name, slug, description, fields) VALUES
(
  'Gig',
  'gigs',
  'Freelancer service offerings',
  '[
    {
      "name": "title",
      "type": "text",
      "required": true,
      "label": "Gig Title"
    },
    {
      "name": "description",
      "type": "textarea",
      "required": true,
      "label": "Description"
    },
    {
      "name": "price",
      "type": "number",
      "required": true,
      "label": "Starting Price"
    },
    {
      "name": "deliveryTime",
      "type": "text",
      "required": true,
      "label": "Delivery Time"
    },
    {
      "name": "technologies",
      "type": "array",
      "required": true,
      "label": "Technologies"
    },
    {
      "name": "thumbnailUrl",
      "type": "text",
      "required": true,
      "label": "Thumbnail URL"
    }
  ]'
) ON CONFLICT (slug) DO NOTHING;