import { Users, DollarSign, Scale, Target } from 'lucide-react';

export const aiBusinessSolutions = {
  id: 'ai-business',
  name: 'AI Business Solutions',
  icon: DollarSign,
  description: 'Enterprise-grade AI solutions for business optimization',
  subcategories: [
    {
      id: 'hr-recruitment',
      name: 'AI in HR & Recruitment',
      services: [
        { id: 'resume-screening', name: 'Resume Screening & Matching', path: '/services/ai-business/resume-screening' },
        { id: 'hr-chatbot', name: 'AI Chatbot for HR Queries', path: '/services/ai-business/hr-chatbot' },
        { id: 'sentiment-analysis', name: 'Employee Sentiment Analysis', path: '/services/ai-business/sentiment-analysis' }
      ]
    },
    {
      id: 'finance',
      name: 'AI in Finance',
      services: [
        { id: 'credit-scoring', name: 'Credit Scoring Models', path: '/services/ai-business/credit-scoring' },
        { id: 'fraud-detection', name: 'Fraud Detection Systems', path: '/services/ai-business/fraud-detection' },
        { id: 'investment-forecast', name: 'Investment Forecasting', path: '/services/ai-business/investment-forecast' }
      ]
    },
    {
      id: 'legal',
      name: 'AI for Legal Services',
      services: [
        { id: 'contract-analysis', name: 'Contract Analysis with NLP', path: '/services/ai-business/contract-analysis' },
        { id: 'document-automation', name: 'Legal Document Automation', path: '/services/ai-business/document-automation' },
        { id: 'case-prediction', name: 'Predictive Case Outcomes', path: '/services/ai-business/case-prediction' }
      ]
    },
    {
      id: 'marketing',
      name: 'AI-Powered Marketing Solutions',
      services: [
        { id: 'campaign-optimization', name: 'AI Ad Campaign Optimization', path: '/services/ai-business/campaign-optimization' },
        { id: 'ai-copywriting', name: 'AI Copywriting for Ads', path: '/services/ai-business/ai-copywriting' },
        { id: 'lead-scoring', name: 'Predictive Lead Scoring', path: '/services/ai-business/lead-scoring' }
      ]
    }
  ]
};