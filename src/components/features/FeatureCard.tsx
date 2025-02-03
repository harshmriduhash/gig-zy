import React from 'react';
import { Clock, MessageSquareHeart, HeartHandshake, BadgeCheck } from 'lucide-react';
import type { Feature } from './types';

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const isLarge = feature.gridClass.includes('col-span-2');
  
  return (
    <div
      className={`${feature.gridClass} ${
        isLarge
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
          : 'bg-gray-50 dark:bg-gray-700'
      } rounded-xl p-6 shadow-lg transform transition-transform hover:scale-105`}
    >
      <div className="flex items-center mb-4">
        <feature.icon className={`h-8 w-8 ${
          isLarge ? 'text-indigo-100' : 'text-indigo-600 dark:text-indigo-400'
        }`} />
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${
        isLarge ? 'text-white' : 'text-gray-900 dark:text-white'
      }`}>
        {feature.title}
      </h3>
      <p className={isLarge ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'}>
        {feature.description}
      </p>
      {isLarge && <AdditionalFeatures />}
    </div>
  );
}

function AdditionalFeatures() {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <FeatureItem icon={Clock} text="Time Tracking" />
      <FeatureItem icon={MessageSquareHeart} text="Secure Messaging" />
      <FeatureItem icon={HeartHandshake} text="Dispute Resolution" />
      <FeatureItem icon={BadgeCheck} text="24/7 Support" />
    </div>
  );
}

function FeatureItem({ icon: Icon, text }: { icon: typeof Clock; text: string }) {
  return (
    <div className="flex items-center">
      <Icon className="h-5 w-5 text-indigo-100 mr-2" />
      <span className="text-sm text-indigo-100">{text}</span>
    </div>
  );
}