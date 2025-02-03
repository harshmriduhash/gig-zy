import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Grid, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  {
    title: 'AI for Gaming',
    description: 'Advanced AI solutions for gaming and interactive entertainment',
    icon: 'Gamepad',
    path: '/services/ai/gaming',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'AI for Retail',
    description: 'Transform retail operations with intelligent AI solutions',
    icon: 'ShoppingBag',
    path: '/services/ai/retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'AI for Real Estate',
    description: 'Intelligent solutions for property valuation and market analysis',
    icon: 'Home',
    path: '/services/ai/real-estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'AI for Healthcare',
    description: 'Advanced AI solutions for improved patient care and medical analysis',
    icon: 'Stethoscope',
    path: '/services/ai/healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'AI for Travel & Hospitality',
    description: 'Transform travel experiences with intelligent AI solutions',
    icon: 'Plane',
    path: '/services/ai/travel',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'AI for Agriculture',
    description: 'Smart farming solutions powered by artificial intelligence',
    icon: 'Leaf',
    path: '/services/ai/agriculture',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export function AIIndustriesPage() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Brain className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Solutions Across Industries
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Discover how artificial intelligence is transforming different sectors with innovative solutions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Link
              key={industry.title}
              to={industry.path}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-gray-100">
                    {industry.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}