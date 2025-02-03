import React from 'react';
import { Bot } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Custom Chatbots",
    description: "Development of tailored chatbot solutions for specific use cases"
  },
  {
    title: "NLP Integration",
    description: "Natural language processing for enhanced understanding"
  },
  {
    title: "Multi-platform Support",
    description: "Integration across multiple messaging platforms"
  },
  {
    title: "Analytics & Insights",
    description: "Advanced analytics and conversation insights"
  },
  {
    title: "Multilingual Support",
    description: "Support for multiple languages and dialects"
  },
  {
    title: "Integration Services",
    description: "Integration with existing systems and workflows"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Custom AI Chatbot Development',
    description: 'End-to-end development of intelligent chatbots with natural language understanding.',
    price: 1999,
    rating: 4.9,
    reviewCount: 134,
    sellerName: 'Emily Chen',
    sellerLevel: 'Chatbot Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Rasa', 'NLP', 'Python'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'GPT-Powered Support Bot',
    description: 'Implementation of advanced customer support chatbots using GPT models.',
    price: 1499,
    rating: 4.8,
    reviewCount: 89,
    sellerName: 'Alex Thompson',
    sellerLevel: 'GPT Integration Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['OpenAI', 'Node.js', 'React'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Multilingual Virtual Assistant',
    description: 'Development of AI-powered virtual assistants with multilingual capabilities.',
    price: 2499,
    rating: 5.0,
    reviewCount: 67,
    sellerName: 'Maria Rodriguez',
    sellerLevel: 'ML Translation Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Transformers', 'FastAPI', 'TensorFlow'],
    hasVideoConsultation: false
  }
];

export function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI-Powered Chatbot Development"
        description="Connect with chatbot experts to build intelligent conversational interfaces for your business"
        icon={Bot}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}