export interface DeepLearningExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface DeepLearningOffering {
  id: string;
  title: string;
  description: string;
  expert: DeepLearningExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}