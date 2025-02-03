export interface AIExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface AIIntegrationOffering {
  id: string;
  title: string;
  description: string;
  expert: AIExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}