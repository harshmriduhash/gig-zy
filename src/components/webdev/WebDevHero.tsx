import React from 'react';
import { Code, Globe, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Code,
    title: 'Custom Solutions',
    description: 'Tailored web development solutions that match your specific business needs'
  },
  {
    icon: Globe,
    title: 'Scalable & Responsive',
    description: 'Websites that work flawlessly across all devices and can grow with your business'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Built with the latest security standards and best practices in mind'
  }
];

export function WebDevHero() {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Expert Web Development Services
          </h1>
          <p className="text-xl text-blue-100">
            Transform your digital presence with our professional web development solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <benefit.icon className="h-10 w-10 text-blue-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-blue-100">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}