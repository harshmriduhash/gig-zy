import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Customer Analytics",
    description: "Advanced customer behavior analysis and segmentation"
  },
  {
    title: "Inventory Optimization",
    description: "AI-driven inventory management and demand forecasting"
  },
  {
    title: "Personalization",
    description: "Personalized shopping experiences and recommendations"
  },
  {
    title: "Price Optimization",
    description: "Dynamic pricing and market analysis systems"
  },
  {
    title: "Visual Search",
    description: "AI-powered visual search and product recognition"
  },
  {
    title: "Fraud Detection",
    description: "Intelligent fraud detection and prevention systems"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Retail Analytics Platform',
    description: 'Comprehensive retail analytics solution with customer behavior analysis and demand forecasting.',
    price: 2499,
    rating: 4.9,
    reviewCount: 124,
    sellerName: 'Sarah Chen',
    sellerLevel: 'Retail AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Analytics', 'Machine Learning', 'Python'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Smart Inventory System',
    description: 'AI-powered inventory management and optimization system.',
    price: 1999,
    rating: 4.8,
    reviewCount: 98,
    sellerName: 'Michael Thompson',
    sellerLevel: 'Supply Chain AI Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Inventory', 'Forecasting', 'Deep Learning'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Personalization Engine',
    description: 'Advanced recommendation system for personalized shopping experiences.',
    price: 1799,
    rating: 5.0,
    reviewCount: 76,
    sellerName: 'Emma Wilson',
    sellerLevel: 'AI Personalization Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Recommendations', 'NLP', 'TensorFlow'],
    hasVideoConsultation: false
  }
];

export function AIRetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI for Retail"
        description="Transform your retail business with intelligent AI solutions for analytics, inventory, and customer experience"
        icon={ShoppingBag}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}