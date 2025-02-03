export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  sellerName: string;
  sellerLevel: string;
  sellerAvatar: string;
  thumbnailUrl: string;
  tags: string[];
  hasVideoConsultation?: boolean;
}