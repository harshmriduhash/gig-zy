import React from 'react';
import { Plane } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Travel Planning",
    description: "AI-powered personalized travel planning and itinerary generation"
  },
  {
    title: "Price Prediction",
    description: "Intelligent price forecasting for flights and accommodations"
  },
  {
    title: "Customer Service",
    description: "AI-driven customer support and booking assistance"
  },
  {
    title: "Revenue Management",
    description: "Dynamic pricing and revenue optimization systems"
  },
  {
    title: "Guest Experience",
    description: "Personalized guest experience and recommendation systems"
  },
  {
    title: "Operations Management",
    description: "AI solutions for hospitality operations and efficiency"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Smart Travel Planner',
    description: 'AI-powered travel planning and itinerary optimization system.',
    price: 1999,
    rating: 4.9,
    reviewCount: 134,
    sellerName: 'Maria Rodriguez',
    sellerLevel: 'Travel AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Travel Planning', 'Machine Learning', 'NLP'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Revenue Optimization System',
    description: 'Dynamic pricing and revenue management platform for hospitality.',
    price: 2499,
    rating: 4.8,
    reviewCount: 92,
    sellerName: 'Alex Thompson',
    sellerLevel: 'Revenue Management Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Revenue Management', 'Analytics', 'Python'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Guest Experience Platform',
    description: 'AI-driven guest experience and recommendation system.',
    price: 1799,
    rating: 5.0,
    reviewCount: 78,
    sellerName: 'Sarah Chen',
    sellerLevel: 'Hospitality AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Personalization', 'Deep Learning', 'Customer Experience'],
    hasVideoConsultation: false
  }
];

export function AITravelPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI for Travel & Hospitality"
        description="Transform travel and hospitality experiences with intelligent AI solutions for planning, pricing, and guest experience"
        icon={Plane}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}