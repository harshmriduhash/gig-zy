import React from 'react';
import { Zap } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Q-Learning & Deep Q Networks",
    description: "Implementation of Q-learning algorithms and deep Q-networks for complex decision-making"
  },
  {
    title: "Policy Gradient Methods",
    description: "Development of policy-based RL algorithms for continuous action spaces"
  },
  {
    title: "Multi-Agent Systems",
    description: "Design and implementation of multi-agent reinforcement learning systems"
  },
  {
    title: "Environment Design",
    description: "Creation of custom environments and reward structures for RL training"
  },
  {
    title: "Model-Based RL",
    description: "Implementation of model-based reinforcement learning approaches"
  },
  {
    title: "RL for Robotics",
    description: "Application of RL in robotic control and automation systems"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Custom RL Agent Development',
    description: 'End-to-end development of reinforcement learning agents for complex decision-making tasks.',
    price: 2999,
    rating: 4.9,
    reviewCount: 87,
    sellerName: 'Dr. Sarah Chen',
    sellerLevel: 'RL Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['PyTorch', 'TensorFlow', 'OpenAI Gym'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'RL for Robotics & Control',
    description: 'Implementation of reinforcement learning solutions for robotic control and automation.',
    price: 3499,
    rating: 4.8,
    reviewCount: 62,
    sellerName: 'Michael Zhang',
    sellerLevel: 'Robotics RL Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['ROS', 'Python', 'Control Systems'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Multi-Agent RL Systems',
    description: 'Development of multi-agent reinforcement learning solutions for complex environments.',
    price: 2799,
    rating: 5.0,
    reviewCount: 45,
    sellerName: 'Emma Wilson',
    sellerLevel: 'MARL Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Multi-Agent RL', 'Game Theory', 'Python'],
    hasVideoConsultation: false
  }
];

export function RLPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="Reinforcement Learning"
        description="Connect with RL experts to build intelligent decision-making systems"
        icon={Zap}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}