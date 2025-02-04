export interface ContentField {
  name: string;
  type: "text" | "textarea" | "number" | "array" | "object" | "boolean";
  required: boolean;
  label: string;
  fields?: ContentField[]; // For nested fields in object type
}

export interface ContentType {
  id: string;
  name: string;
  slug: string;
  description: string;
  fields: ContentField[];
}

export interface ContentItem {
  id: string;
  type_id: string;
  type: ContentType;
  title: string;
  slug: string;
  content: Record<string, any>;
  status: "draft" | "published" | "archived";
  created_by: string;
  updated_by: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Record<string, any>;
  created_by: {
    id: string;
    full_name: string;
  };
  created_at: string;
}
