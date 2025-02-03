export interface RLExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface RLOffering {
  id: string;
  title: string;
  description: string;
  expert: RLExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}