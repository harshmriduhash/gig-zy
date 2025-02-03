import React from 'react';
import { BookOpen } from 'lucide-react';

interface Topic {
  title: string;
  description: string;
}

interface ServiceTopicsProps {
  topics: Topic[];
}

export function ServiceTopics({ topics }: ServiceTopicsProps) {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <BookOpen className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Topics Covered
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive coverage of key concepts and applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {topic.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}