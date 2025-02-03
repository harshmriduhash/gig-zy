import React from 'react';
import { Server, Smartphone, ShoppingCart, Code2, Database, Cloud } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development using modern technologies'
  },
  {
    icon: Smartphone,
    title: 'Responsive Web Design',
    description: 'Mobile-first websites that adapt to any screen size'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Custom online stores with secure payment integration'
  },
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'Beautiful and interactive user interfaces'
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Robust server-side solutions and APIs'
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Scalable cloud-based web applications'
  }
];

export function WebDevServices() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Web Development Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive web development solutions for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <service.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}