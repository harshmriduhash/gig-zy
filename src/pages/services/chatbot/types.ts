export interface ChatbotExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface ChatbotOffering {
  id: string;
  title: string;
  description: string;
  expert: ChatbotExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}