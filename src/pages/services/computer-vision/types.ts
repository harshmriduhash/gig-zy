export interface CVExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface CVOffering {
  id: string;
  title: string;
  description: string;
  expert: CVExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}