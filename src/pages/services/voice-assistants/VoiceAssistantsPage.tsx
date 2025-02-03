import React from 'react';
import { Mic } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Voice Recognition",
    description: "Advanced speech recognition and transcription systems"
  },
  {
    title: "Voice Synthesis",
    description: "Natural-sounding text-to-speech solutions"
  },
  {
    title: "Virtual Assistants",
    description: "Intelligent voice-enabled virtual assistants"
  },
  {
    title: "Multilingual Support",
    description: "Support for multiple languages and accents"
  },
  {
    title: "Voice Analytics",
    description: "Voice pattern analysis and insights"
  },
  {
    title: "Custom Wake Words",
    description: "Personalized voice activation phrases"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Custom Voice Assistant',
    description: 'End-to-end development of personalized voice assistants with natural language understanding.',
    price: 2999,
    rating: 4.9,
    reviewCount: 143,
    sellerName: 'Dr. Emily Parker',
    sellerLevel: 'Voice AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Speech Recognition', 'NLP', 'Voice Synthesis'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Speech Recognition System',
    description: 'Implementation of advanced speech recognition and transcription solutions.',
    price: 1999,
    rating: 4.8,
    reviewCount: 87,
    sellerName: 'James Wilson',
    sellerLevel: 'Speech Recognition Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['ASR', 'Deep Learning', 'Python'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Multilingual Voice AI',
    description: 'Development of voice recognition and synthesis systems supporting multiple languages.',
    price: 2499,
    rating: 5.0,
    reviewCount: 92,
    sellerName: 'Sofia Martinez',
    sellerLevel: 'Multilingual Voice Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589254066213-a0c9dc853511?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Multilingual', 'TTS', 'NLP'],
    hasVideoConsultation: false
  }
];

export function VoiceAssistantsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="Voice Assistants & Speech Recognition"
        description="Connect with voice AI experts to build advanced speech recognition and voice assistant solutions"
        icon={Mic}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}