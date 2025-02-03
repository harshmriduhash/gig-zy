import { Target, Shield, Globe2, Users, Headphones } from 'lucide-react';
import type { Feature } from '../types';

export const features: Feature[] = [
  {
    title: 'Tailored Matching',
    description: 'Advanced algorithms ensure you\'re paired with the perfect freelancer or project based on your unique needs.',
    icon: Target,
    gridClass: 'col-span-1'
  },
  {
    title: 'Transparent Transactions',
    description: 'Clear pricing, milestone-based payments, and no hidden fees—trust is our top priority.',
    icon: Shield,
    gridClass: 'col-span-1'
  },
  {
    title: 'Global Reach',
    description: 'Access a diverse pool of skilled professionals or exciting projects from around the world.',
    icon: Globe2,
    gridClass: 'col-span-1'
  },
  {
    title: 'Community-Driven',
    description: 'Foster meaningful connections through community features, including reviews, endorsements, and networking events.',
    icon: Users,
    gridClass: 'col-span-1'
  },
  {
    title: 'Comprehensive Support',
    description: 'Our platform provides tools like time tracking, secure messaging, and a dispute resolution system to ensure your experience is hassle-free.',
    icon: Headphones,
    gridClass: 'col-span-2 lg:col-start-2 lg:col-end-4'
  }
];