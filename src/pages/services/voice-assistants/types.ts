export interface VoiceExpert {
  name: string;
  avatar: string;
  level: string;
}

export interface VoiceOffering {
  id: string;
  title: string;
  description: string;
  expert: VoiceExpert;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  technologies: string[];
  thumbnailUrl: string;
  featured?: boolean;
}