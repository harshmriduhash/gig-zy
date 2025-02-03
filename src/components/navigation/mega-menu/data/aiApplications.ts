import { Bot, Pen, Target, Shield, ShoppingBag, Stethoscope, GraduationCap } from 'lucide-react';

export const aiApplications = {
  id: 'ai-applications',
  name: 'AI-Powered Applications',
  icon: Bot,
  description: 'Industry-specific AI solutions and intelligent applications',
  subcategories: [
    {
      id: 'chatbots',
      name: 'Chatbots & Virtual Assistants',
      services: [
        { id: 'customer-support', name: 'Customer Support Bots', path: '/services/ai-apps/customer-support-bots' },
        { id: 'multilingual', name: 'Multilingual Virtual Assistants', path: '/services/ai-apps/multilingual-assistants' },
        { id: 'faq-systems', name: 'AI-Powered FAQ Systems', path: '/services/ai-apps/faq-systems' }
      ]
    },
    {
      id: 'content-creation',
      name: 'AI in Content Creation',
      services: [
        { id: 'ai-writing', name: 'AI Writing & Content Generation', path: '/services/ai-apps/content-generation' },
        { id: 'ai-video', name: 'AI Video Creation', path: '/services/ai-apps/video-creation' },
        { id: 'ai-design', name: 'AI-Powered Graphic Design', path: '/services/ai-apps/graphic-design' },
        { id: 'ai-voiceover', name: 'AI Voiceovers & Dubbing', path: '/services/ai-apps/voiceovers' }
      ]
    },
    {
      id: 'personalization',
      name: 'AI-Powered Personalization',
      services: [
        { id: 'marketing', name: 'Personalized Marketing Campaigns', path: '/services/ai-apps/marketing-campaigns' },
        { id: 'recommendations', name: 'Recommendation Systems', path: '/services/ai-apps/recommendation-systems' },
        { id: 'dynamic-pricing', name: 'Dynamic Pricing Models', path: '/services/ai-apps/dynamic-pricing' }
      ]
    },
    {
      id: 'cybersecurity',
      name: 'AI in Cybersecurity',
      services: [
        { id: 'fraud-detection', name: 'Fraud Detection Models', path: '/services/ai-apps/fraud-detection' },
        { id: 'intrusion-detection', name: 'Intrusion Detection Systems', path: '/services/ai-apps/intrusion-detection' },
        { id: 'threat-response', name: 'Automated Threat Response', path: '/services/ai-apps/threat-response' }
      ]
    },
    {
      id: 'ecommerce',
      name: 'AI for E-Commerce',
      services: [
        { id: 'product-recommendations', name: 'AI Product Recommendation Engines', path: '/services/ai-apps/product-recommendations' },
        { id: 'search-solutions', name: 'AI-Powered Search Solutions', path: '/services/ai-apps/search-solutions' },
        { id: 'inventory-management', name: 'Inventory Management with Predictive Analytics', path: '/services/ai-apps/inventory-management' }
      ]
    },
    {
      id: 'healthcare',
      name: 'AI in Healthcare',
      services: [
        { id: 'medical-diagnosis', name: 'Medical Diagnosis Models', path: '/services/ai-apps/medical-diagnosis' },
        { id: 'drug-discovery', name: 'AI in Drug Discovery', path: '/services/ai-apps/drug-discovery' },
        { id: 'patient-monitoring', name: 'Remote Patient Monitoring', path: '/services/ai-apps/patient-monitoring' }
      ]
    },
    {
      id: 'education',
      name: 'AI in Education',
      services: [
        { id: 'ai-tutors', name: 'AI Tutors & Learning Assistants', path: '/services/ai-apps/ai-tutors' },
        { id: 'learning-paths', name: 'Personalized Learning Paths', path: '/services/ai-apps/learning-paths' },
        { id: 'automated-grading', name: 'Automated Grading Systems', path: '/services/ai-apps/automated-grading' }
      ]
    }
  ]
};