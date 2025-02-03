import { Settings, Lightbulb, Shield, Scale } from 'lucide-react';

export const aiMaintenanceSupport = {
  id: 'ai-maintenance',
  name: 'AI Maintenance & Support',
  icon: Settings,
  description: 'Comprehensive AI maintenance, consulting, and compliance solutions',
  subcategories: [
    {
      id: 'model-maintenance',
      name: 'AI Model Maintenance',
      services: [
        { id: 'model-updates', name: 'Continuous Model Updates', path: '/services/ai-maintenance/model-updates' },
        { id: 'model-retraining', name: 'Retraining Models with New Data', path: '/services/ai-maintenance/model-retraining' }
      ]
    },
    {
      id: 'ai-consulting',
      name: 'AI Consulting',
      services: [
        { id: 'strategy', name: 'AI Strategy Development', path: '/services/ai-maintenance/strategy' },
        { id: 'feasibility', name: 'AI Feasibility Studies', path: '/services/ai-maintenance/feasibility' }
      ]
    },
    {
      id: 'ethical-review',
      name: 'AI Ethical Review & Bias Detection',
      services: [
        { id: 'ethical-ai', name: 'Ensuring Ethical AI Use', path: '/services/ai-maintenance/ethical-ai' },
        { id: 'bias-removal', name: 'Removing Bias from AI Models', path: '/services/ai-maintenance/bias-removal' }
      ]
    },
    {
      id: 'legal-compliance',
      name: 'AI Legal Compliance & GDPR',
      services: [
        { id: 'data-compliance', name: 'Ensuring AI Compliance with Data Laws', path: '/services/ai-maintenance/data-compliance' },
        { id: 'privacy-measures', name: 'Implementing Data Privacy Measures', path: '/services/ai-maintenance/privacy-measures' }
      ]
    }
  ]
};