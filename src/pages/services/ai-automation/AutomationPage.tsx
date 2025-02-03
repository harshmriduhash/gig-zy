import React from 'react';
import { Workflow } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Process Automation",
    description: "End-to-end business process automation solutions"
  },
  {
    title: "Workflow Optimization",
    description: "AI-driven workflow optimization and efficiency"
  },
  {
    title: "Document Processing",
    description: "Intelligent document processing and analysis"
  },
  {
    title: "RPA Integration",
    description: "Robotic Process Automation with AI capabilities"
  },
  {
    title: "Decision Automation",
    description: "Automated decision-making systems and workflows"
  },
  {
    title: "Quality Assurance",
    description: "AI-powered quality control and verification"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Business Process Automation',
    description: 'End-to-end automation solutions for streamlining business operations.',
    price: 2999,
    rating: 4.9,
    reviewCount: 128,
    sellerName: 'Alex Morgan',
    sellerLevel: 'Automation Architect',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['RPA', 'Python', 'Process Automation'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Document Processing System',
    description: 'AI-powered document processing and data extraction solution.',
    price: 1999,
    rating: 4.8,
    reviewCount: 94,
    sellerName: 'Sarah Chen',
    sellerLevel: 'IDP Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['OCR', 'NLP', 'Machine Learning'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Workflow Automation',
    description: 'Intelligent workflow automation and optimization platform.',
    price: 2499,
    rating: 5.0,
    reviewCount: 76,
    sellerName: 'Michael Torres',
    sellerLevel: 'Workflow Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Workflow', 'Automation', 'Integration'],
    hasVideoConsultation: false
  }
];

export function AutomationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI Automation for Business"
        description="Transform your business operations with intelligent automation solutions"
        icon={Workflow}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}