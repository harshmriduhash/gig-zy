import { LucideIcon } from 'lucide-react';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  subcategories: ServiceSubcategory[];
}

export interface ServiceSubcategory {
  id: string;
  name: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  path: string;
}