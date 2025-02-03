import React from 'react';
import { Book, Brain, Star, Users } from 'lucide-react';

const categories = [
  {
    title: 'AI Fundamentals',
    icon: Brain,
    articles: [
      { title: 'Introduction to Artificial Intelligence', readTime: '5 min read' },
      { title: 'Machine Learning Basics', readTime: '8 min read' },
      { title: 'Neural Networks Explained', readTime: '10 min read' }
    ]
  },
  {
    title: 'AI Applications',
    icon: Star,
    articles: [
      { title: 'AI in Business Automation', readTime: '7 min read' },
      { title: 'Computer Vision Applications', readTime: '6 min read' },
      { title: 'Natural Language Processing Use Cases', readTime: '9 min read' }
    ]
  },
  {
    title: 'AI Implementation',
    icon: Users,
    articles: [
      { title: 'Best Practices for AI Integration', readTime: '8 min read' },
      { title: 'Scaling AI Solutions', readTime: '7 min read' },
      { title: 'AI Project Management Guide', readTime: '12 min read' }
    ]
  }
];

export function AIKnowledgeBasePage() {
  return (
    <>
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Book className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Knowledge Base
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Comprehensive resources and guides to help you understand and implement AI solutions effectively
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <category.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                  {category.title}
                </h2>
              </div>
              <div className="space-y-4">
                {category.articles.map((article) => (
                  <div
                    key={article.title}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {article.readTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}