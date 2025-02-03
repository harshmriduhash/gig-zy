import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Shield, Globe2, Users, Headphones, Grid } from 'lucide-react';

const stats = [
  { label: 'Total Freelancers', value: '6.9K+', icon: Users },
  { label: 'Positive Reviews', value: '130K+', icon: Shield },
  { label: 'Orders Completed', value: '200K+', icon: Globe2 },
  { label: 'Active Clients', value: '4.6K+', icon: Headphones }
];

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-900 to-indigo-700 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find the Perfect{' '}
              <span className="text-indigo-300">AI Solutions</span>
            </h1>
            <p className="text-lg text-indigo-100 mb-8">
              Connect with top AI freelancers to bring your ideas to life — tailored services, innovative solutions, and competitive pricing to maximize your project's impact
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-indigo-200">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/services/ai/industries"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <Grid className="h-5 w-5 mr-2" />
                Explore AI Solutions by Industry
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="AI Technology Illustration"
                className="rounded-lg shadow-2xl w-[600px] h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium">4.9/5 average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}