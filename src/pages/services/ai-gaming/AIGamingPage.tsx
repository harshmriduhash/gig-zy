import React from 'react';
import { Gamepad } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Game AI Architecture",
    description: "Design and implementation of intelligent game systems and AI-driven behavior trees"
  },
  {
    title: "NPC Intelligence",
    description: "Advanced AI for non-player characters with realistic decision-making and learning capabilities"
  },
  {
    title: "Procedural Generation",
    description: "AI-powered generation of game content, levels, and environments"
  },
  {
    title: "Pathfinding & Navigation",
    description: "Intelligent movement systems and dynamic obstacle avoidance"
  },
  {
    title: "Combat AI",
    description: "Strategic combat behavior and tactical decision-making systems"
  },
  {
    title: "Dynamic Difficulty",
    description: "Adaptive difficulty systems that adjust to player skill and behavior"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Custom Game AI Development',
    description: 'End-to-end development of intelligent game systems including NPCs, pathfinding, and decision-making.',
    price: 2499,
    rating: 4.9,
    reviewCount: 128,
    sellerName: 'Alex Chen',
    sellerLevel: 'Game AI Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Unity', 'Unreal Engine', 'Machine Learning'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Procedural Content Generation',
    description: 'AI-powered systems for generating game levels, environments, and content dynamically.',
    price: 1999,
    rating: 4.8,
    reviewCount: 94,
    sellerName: 'Maria Rodriguez',
    sellerLevel: 'PCG Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['PCG', 'Python', 'Neural Networks'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Game Behavior Systems',
    description: 'Implementation of advanced AI behavior systems for NPCs and game entities.',
    price: 1799,
    rating: 5.0,
    reviewCount: 76,
    sellerName: 'James Wilson',
    sellerLevel: 'AI Engineer',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Behavior Trees', 'C++', 'AI'],
    hasVideoConsultation: false
  }
];

export function AIGamingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI for Gaming"
        description="Connect with gaming AI experts to build intelligent and immersive game experiences"
        icon={Gamepad}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}