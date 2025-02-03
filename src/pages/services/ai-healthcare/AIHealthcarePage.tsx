import React from 'react';
import { Stethoscope } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Medical Imaging",
    description: "AI-powered medical image analysis and diagnosis"
  },
  {
    title: "Patient Analytics",
    description: "Predictive analytics for patient care and outcomes"
  },
  {
    title: "Clinical Decision Support",
    description: "AI-driven clinical decision support systems"
  },
  {
    title: "Drug Discovery",
    description: "AI applications in drug discovery and development"
  },
  {
    title: "Healthcare Operations",
    description: "Optimization of healthcare operations and resources"
  },
  {
    title: "Remote Monitoring",
    description: "AI-enabled remote patient monitoring systems"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Medical Imaging AI',
    description: 'Advanced AI solutions for medical image analysis and diagnosis assistance.',
    price: 3499,
    rating: 4.9,
    reviewCount: 145,
    sellerName: 'Dr. Sarah Chen',
    sellerLevel: 'Medical AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Medical Imaging', 'Deep Learning', 'Computer Vision'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Patient Analytics Platform',
    description: 'Comprehensive patient analytics and predictive healthcare platform.',
    price: 2999,
    rating: 4.8,
    reviewCount: 98,
    sellerName: 'Dr. Michael Thompson',
    sellerLevel: 'Healthcare Analytics Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Analytics', 'Machine Learning', 'Python'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Clinical Decision Support',
    description: 'AI-powered clinical decision support and diagnosis assistance system.',
    price: 2499,
    rating: 5.0,
    reviewCount: 76,
    sellerName: 'Dr. Emma Wilson',
    sellerLevel: 'Clinical AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Clinical AI', 'NLP', 'Decision Support'],
    hasVideoConsultation: false
  }
];

export function AIHealthcarePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI for Healthcare"
        description="Transform healthcare delivery with intelligent AI solutions for diagnosis, patient care, and clinical decision support"
        icon={Stethoscope}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}