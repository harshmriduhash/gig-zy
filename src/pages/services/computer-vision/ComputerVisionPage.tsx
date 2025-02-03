import React from 'react';
import { Eye } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { ServiceTopics } from '../../../components/services/ServiceTopics';
import { ServiceOfferings } from '../../../components/services/ServiceOfferings';

const topics = [
  {
    title: "Object Detection & Recognition",
    description: "Implementation of state-of-the-art object detection and recognition systems"
  },
  {
    title: "Image Segmentation",
    description: "Advanced image segmentation techniques for precise object isolation"
  },
  {
    title: "Face Recognition",
    description: "Secure and accurate face recognition and verification systems"
  },
  {
    title: "Video Analysis",
    description: "Real-time video processing and analysis solutions"
  },
  {
    title: "Medical Imaging",
    description: "Specialized computer vision applications for medical image analysis"
  },
  {
    title: "Industrial Inspection",
    description: "Automated visual inspection systems for manufacturing"
  }
];

const offerings = [
  {
    id: '1',
    title: 'Custom Object Detection Models',
    description: 'Development of specialized object detection models for your specific use case.',
    price: 1999,
    rating: 4.9,
    reviewCount: 156,
    sellerName: 'Dr. Lisa Chen',
    sellerLevel: 'CV Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['YOLO', 'PyTorch', 'OpenCV'],
    hasVideoConsultation: true
  },
  {
    id: '2',
    title: 'Medical Image Analysis',
    description: 'Specialized computer vision solutions for medical imaging and diagnosis.',
    price: 2499,
    rating: 4.8,
    reviewCount: 92,
    sellerName: 'Dr. James Wilson',
    sellerLevel: 'Medical CV Specialist',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Medical Imaging', 'Deep Learning', 'Segmentation'],
    hasVideoConsultation: true
  },
  {
    id: '3',
    title: 'Industrial Vision Systems',
    description: 'Automated visual inspection and quality control systems for manufacturing.',
    price: 1799,
    rating: 5.0,
    reviewCount: 78,
    sellerName: 'Sarah Kim',
    sellerLevel: 'Industrial CV Expert',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Machine Vision', 'Quality Control', 'Automation'],
    hasVideoConsultation: false
  }
];

export function ComputerVisionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="Computer Vision"
        description="Connect with computer vision experts to build advanced image and video processing solutions"
        icon={Eye}
      />
      <ServiceTopics topics={topics} />
      <ServiceOfferings offerings={offerings} />
    </div>
  );
}