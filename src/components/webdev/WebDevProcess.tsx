import React from 'react';
import { ClipboardList, Code, TestTube, Rocket } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Requirements Analysis',
    description: 'We thoroughly analyze your needs and create a detailed project plan'
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Our experts build your solution using the latest technologies'
  },
  {
    icon: TestTube,
    title: 'Testing & QA',
    description: 'Rigorous testing ensures your project meets quality standards'
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'We launch your project and provide ongoing support'
  }
];

export function WebDevProcess() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Development Process
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A streamlined approach to delivering exceptional results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-indigo-200 dark:bg-indigo-800 transform -translate-x-4" />
              )}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 relative z-10">
                <div className="bg-indigo-600 dark:bg-indigo-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}