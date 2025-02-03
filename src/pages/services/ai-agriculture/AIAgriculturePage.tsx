import React from 'react';
import { Leaf } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Crop Monitoring",
    description: "AI-powered crop health monitoring and disease detection"
  },
  {
    title: "Yield Prediction",
    description: "Advanced yield forecasting and optimization systems"
  },
  {
    title: "Precision Farming",
    description: "Smart farming solutions for resource optimization"
  },
  {
    title: "Weather Analysis",
    description: "Intelligent weather prediction and risk assessment"
  },
  {
    title: "Soil Analysis",
    description: "AI-driven soil health monitoring and management"
  },
  {
    title: "Smart Irrigation",
    description: "Automated irrigation systems with AI optimization"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Smart Farming Platform',
    description: 'Comprehensive AI solution for precision agriculture and crop management.',
    price: 2499,
    rating: 4.9,
    reviewCount: 118,
    sellerName: 'Dr. James Wilson',
    sellerLevel: 'AgriTech Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Precision Agriculture', 'Machine Learning', 'IoT'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Crop Health Monitor',
    description: 'AI-powered crop disease detection and health monitoring system.',
    price: 1999,
    rating: 4.8,
    reviewCount: 94,
    sellerName: 'Emily Chen',
    sellerLevel: 'Computer Vision Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Computer Vision', 'Deep Learning', 'Disease Detection'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Yield Optimization System',
    description: 'Advanced yield prediction and optimization platform.',
    price: 1799,
    rating: 5.0,
    reviewCount: 82,
    sellerName: 'Michael Thompson',
    sellerLevel: 'Agricultural AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Yield Prediction', 'Analytics', 'Python'],
    hasVideoConsultation: false
  }
];

export function AIAgriculturePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI for Agriculture"
        description="Transform farming with intelligent AI solutions for crop management, yield optimization, and precision agriculture"
        icon={Leaf}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}