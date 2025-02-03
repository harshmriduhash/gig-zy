export interface NLPExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface NLPOffering {
  id: string;
  title: string;
  description: string;
  expert: NLPExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}