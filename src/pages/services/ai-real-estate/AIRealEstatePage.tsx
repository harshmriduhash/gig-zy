import React from 'react';
import { Home } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Property Valuation",
    description: "AI-powered property value estimation and market analysis"
  },
  {
    title: "Market Prediction",
    description: "Advanced market trend forecasting and investment analysis"
  },
  {
    title: "Virtual Tours",
    description: "AI-enhanced virtual property tours and visualization"
  },
  {
    title: "Lead Generation",
    description: "Intelligent lead scoring and qualification systems"
  },
  {
    title: "Document Analysis",
    description: "Automated real estate document processing and analysis"
  },
  {
    title: "Location Analytics",
    description: "AI-driven location analysis and neighborhood insights"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Property Valuation AI',
    description: 'Advanced AI system for accurate property valuation and market analysis.',
    price: 1999,
    rating: 4.9,
    reviewCount: 112,
    sellerName: 'David Chen',
    sellerLevel: 'Real Estate AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Valuation', 'Machine Learning', 'Analytics'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Market Prediction System',
    description: 'AI-powered market trend analysis and forecasting platform.',
    price: 2499,
    rating: 4.8,
    reviewCount: 87,
    sellerName: 'Sarah Miller',
    sellerLevel: 'Market Analysis Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Forecasting', 'Deep Learning', 'Python'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Virtual Tour Creator',
    description: 'AI-enhanced virtual property tour generation system.',
    price: 1799,
    rating: 5.0,
    reviewCount: 64,
    sellerName: 'James Wilson',
    sellerLevel: '3D Vision Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['3D Vision', 'VR', 'Computer Vision'],
    hasVideoConsultation: false
  }
];

export function AIRealEstatePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI for Real Estate"
        description="Transform property valuation, market analysis, and customer experience with intelligent AI solutions"
        icon={Home}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}