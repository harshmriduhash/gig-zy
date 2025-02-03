import { Gamepad, Leaf, Home, ShoppingBag, Plane, Stethoscope } from 'lucide-react';
import type { NicheService } from '../types';

export const nicheServices: NicheService[] = [
  {
    id: '1',
    title: 'AI for Gaming',
    description: 'Advanced AI solutions for gaming and interactive entertainment',
    icon: Gamepad,
    services: [
      { name: 'NPC Behavior Models', description: 'Intelligent and adaptive NPC behavior systems' },
      { name: 'AI-Generated Game Levels', description: 'Procedurally generated game environments' }
    ],
    path: '/services/ai/gaming'
  },
  {
    id: '2',
    title: 'AI for Agriculture',
    description: 'Smart farming solutions powered by artificial intelligence',
    icon: Leaf,
    services: [
      { name: 'Crop Disease Detection', description: 'Early detection and diagnosis of crop diseases' },
      { name: 'Precision Farming Solutions', description: 'Data-driven farming optimization systems' }
    ],
    path: '/services/ai/agriculture'
  },
  {
    id: '3',
    title: 'AI for Real Estate',
    description: 'Intelligent real estate analysis and prediction tools',
    icon: Home,
    services: [
      { name: 'AI Property Valuation', description: 'Accurate property value estimation' },
      { name: 'Predictive Market Trends', description: 'Real estate market forecasting' }
    ],
    path: '/services/ai/real-estate'
  },
  {
    id: '4',
    title: 'AI for Retail',
    description: 'Smart retail solutions for better business outcomes',
    icon: ShoppingBag,
    services: [
      { name: 'Customer Sentiment Analysis', description: 'Real-time customer feedback analysis' },
      { name: 'Inventory Optimization', description: 'AI-driven inventory management' }
    ],
    path: '/services/ai/retail'
  },
  {
    id: '5',
    title: 'AI for Healthcare',
    description: 'Cutting-edge AI solutions for enhanced patient care and medical insights',
    icon: Stethoscope,
    services: [
      { name: 'Medical Diagnosis Assistance', description: 'Accurate and rapid identification of diseases through AI-powered analysis' },
      { name: 'Patient Monitoring & Insights', description: 'Real-time health tracking and predictive analytics for personalized care' }
    ],
    path: '/services/ai/healthcare'
  },
  {
    id: '6',
    title: 'AI for Travel & Hospitality',
    description: 'Intelligent travel planning and hospitality solutions',
    icon: Plane,
    services: [
      { name: 'Personalized Travel Recommendations', description: 'Smart travel suggestions' },
      { name: 'AI-Powered Itinerary Planning', description: 'Automated trip planning' }
    ],
    path: '/services/ai/travel'
  }
];