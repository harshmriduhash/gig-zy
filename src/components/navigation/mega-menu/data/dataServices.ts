import { Database, CleanCode, FileCode, BarChart } from 'lucide-react';

export const dataServices = {
  id: 'data-services',
  name: 'Data Services',
  icon: Database,
  description: 'Comprehensive data solutions for AI and machine learning applications',
  subcategories: [
    {
      id: 'data-collection',
      name: 'Data Collection & Annotation',
      services: [
        { id: 'image-video-annotation', name: 'Image/Video Annotation', path: '/services/data/image-video-annotation' },
        { id: 'text-annotation', name: 'Text Annotation (Sentiment, Intent, etc.)', path: '/services/data/text-annotation' },
        { id: 'audio-annotation', name: 'Audio Annotation', path: '/services/data/audio-annotation' },
        { id: 'data-labeling', name: 'Data Labeling for Supervised Learning', path: '/services/data/data-labeling' }
      ]
    },
    {
      id: 'data-cleaning',
      name: 'Data Cleaning & Preprocessing',
      services: [
        { id: 'data-deduplication', name: 'Data Deduplication', path: '/services/data/deduplication' },
        { id: 'missing-data', name: 'Handling Missing Data', path: '/services/data/missing-data' },
        { id: 'feature-engineering', name: 'Feature Engineering', path: '/services/data/feature-engineering' },
        { id: 'data-normalization', name: 'Data Normalization', path: '/services/data/normalization' }
      ]
    },
    {
      id: 'synthetic-data',
      name: 'Synthetic Data Generation',
      services: [
        { id: 'synthetic-media', name: 'Synthetic Images & Videos', path: '/services/data/synthetic-media' },
        { id: 'text-augmentation', name: 'Text Data Augmentation', path: '/services/data/text-augmentation' },
        { id: 'data-privacy', name: 'Data Privacy Solutions', path: '/services/data/privacy-solutions' }
      ]
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics & Visualization',
      services: [
        { id: 'predictive-analytics', name: 'Predictive Analytics', path: '/services/data/predictive-analytics' },
        { id: 'bi-dashboards', name: 'Business Intelligence (BI) Dashboards', path: '/services/data/bi-dashboards' },
        { id: 'custom-reports', name: 'Custom Data Reports', path: '/services/data/custom-reports' }
      ]
    }
  ]
};