import { LucideIcon } from 'lucide-react';

export interface NicheService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  services: {
    name: string;
    description: string;
  }[];
  path?: string;
}