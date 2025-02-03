import { GraduationCap, Users, Award } from 'lucide-react';

export const aiLearningUpskilling = {
  id: 'ai-learning',
  name: 'AI Learning & Upskilling',
  icon: GraduationCap,
  description: 'Comprehensive AI education and professional development services',
  subcategories: [
    {
      id: 'course-creation',
      name: 'AI Course Creation',
      services: [
        { id: 'ai-development', name: 'Courses on AI Development', path: '/services/ai-learning/ai-development' },
        { id: 'machine-learning', name: 'Tutorials on Machine Learning', path: '/services/ai-learning/machine-learning' }
      ]
    },
    {
      id: 'ai-coaching',
      name: 'Personalized AI Coaching',
      services: [
        { id: 'one-on-one', name: 'One-on-One AI Mentorship', path: '/services/ai-learning/mentorship' },
        { id: 'group-coaching', name: 'Group Coaching Sessions', path: '/services/ai-learning/group-coaching' }
      ]
    },
    {
      id: 'certification-prep',
      name: 'AI Certification Preparation',
      services: [
        { id: 'tensorflow-cert', name: 'TensorFlow Certification Prep', path: '/services/ai-learning/tensorflow-cert' },
        { id: 'aws-ai-cert', name: 'AWS AI Certification Prep', path: '/services/ai-learning/aws-ai-cert' }
      ]
    }
  ]
};