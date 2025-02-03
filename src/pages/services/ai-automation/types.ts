export interface AutomationExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface AutomationOffering {
  id: string;
  title: string;
  description: string;
  expert: AutomationExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}