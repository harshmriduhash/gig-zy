export interface MLExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface MLOffering {
  id: string;
  title: string;
  description: string;
  expert: MLExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}