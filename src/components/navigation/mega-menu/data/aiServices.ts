import { Brain, Bot, Database, Code2, Cpu, Gamepad } from 'lucide-react';

export const aiServices = {
  id: 'ai-development',
  name: 'AI Development & Customization',
  icon: Brain,
  description: 'Comprehensive AI solutions for modern business needs',
  subcategories: [
    {
      id: 'custom-ai-models',
      name: 'Custom AI Model Development',
      services: [
        { id: 'ml-models', name: 'Machine Learning (ML) Models', path: '/services/ai/ml-models' },
        { id: 'deep-learning', name: 'Deep Learning Solutions', path: '/services/ai/deep-learning' },
        { id: 'nlp-models', name: 'Natural Language Processing (NLP) Models', path: '/services/ai/nlp' },
        { id: 'computer-vision', name: 'Computer Vision Models', path: '/services/ai/computer-vision' },
        { id: 'reinforcement-learning', name: 'Reinforcement Learning Systems', path: '/services/ai/reinforcement-learning' },
        { id: 'gaming-ai', name: 'AI for Gaming', path: '/services/ai/gaming' }
      ]
    },
    {
      id: 'ai-integration',
      name: 'AI Integration Services',
      services: [
        { id: 'api-integration', name: 'AI API Integration', path: '/services/ai/api-integration' },
        { id: 'chatbot-dev', name: 'AI-Powered Chatbot Development', path: '/services/ai/chatbots' },
        { id: 'process-automation', name: 'AI Automation for Business Processes', path: '/services/ai/automation' },
        { id: 'voice-assistants', name: 'Voice Assistants & Speech Recognition', path: '/services/ai/voice-assistants' }
      ]
    },
    {
      id: 'ai-saas',
      name: 'AI for SaaS Platforms',
      services: [
        { id: 'saas-dev', name: 'AI-driven SaaS Development', path: '/services/ai/saas-development' },
        { id: 'recommendation-engines', name: 'AI-based Recommendations Engines', path: '/services/ai/recommendations' },
        { id: 'predictive-analytics', name: 'Predictive Analytics Solutions', path: '/services/ai/predictive-analytics' }
      ]
    },
    {
      id: 'model-optimization',
      name: 'AI Model Fine-tuning & Optimization',
      services: [
        { id: 'model-tuning', name: 'Fine-tuning Pre-trained Models', path: '/services/ai/model-tuning' },
        { id: 'model-compression', name: 'Model Compression & Acceleration', path: '/services/ai/model-compression' },
        { id: 'model-testing', name: 'AI Model Testing & Validation', path: '/services/ai/model-testing' }
      ]
    }
  ]
};