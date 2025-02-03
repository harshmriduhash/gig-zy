import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Text Classification",
    description: "Advanced text classification and sentiment analysis systems"
  },
  {
    title: "Named Entity Recognition",
    description: "Extraction and classification of named entities from text"
  },
  {
    title: "Language Generation",
    description: "Natural language generation and text summarization"
  },
  {
    title: "Machine Translation",
    description: "Neural machine translation and language understanding"
  },
  {
    title: "Question Answering",
    description: "Intelligent question answering and information extraction"
  },
  {
    title: "Topic Modeling",
    description: "Advanced topic modeling and text clustering solutions"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Custom NLP Model Development',
    description: 'End-to-end development of specialized natural language processing models.',
    price: 1999,
    rating: 4.9,
    reviewCount: 134,
    sellerName: 'Dr. Emily Parker',
    sellerLevel: 'NLP Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['BERT', 'Transformers', 'PyTorch'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Multilingual NLP Solutions',
    description: 'Development of multilingual NLP systems and language understanding models.',
    price: 2499,
    rating: 4.8,
    reviewCount: 87,
    sellerName: 'Alex Thompson',
    sellerLevel: 'Multilingual NLP Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Machine Translation', 'Cross-lingual', 'NLP'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Text Analytics Systems',
    description: 'Implementation of advanced text analytics and information extraction systems.',
    price: 1799,
    rating: 5.0,
    reviewCount: 92,
    sellerName: 'Maria Rodriguez',
    sellerLevel: 'Text Analytics Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Text Mining', 'Analytics', 'Python'],
    hasVideoConsultation: false
  }
];

export function NLPPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="Natural Language Processing"
        description="Connect with NLP experts to build advanced language understanding and processing solutions"
        icon={MessageSquare}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}