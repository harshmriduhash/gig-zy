export type SearchType = 'freelancers' | 'projects';

export interface SearchFilters {
  skills?: string[];
  rating?: number;
  location?: string;
  budget?: {
    min?: number;
    max?: number;
  };
  availability?: string;
  projectLength?: string;
  category?: string;
}

export interface SearchResult {
  id: string;
  type: SearchType;
  title: string;
  description: string;
  rating?: number;
  skills: string[];
  [key: string]: any;
}