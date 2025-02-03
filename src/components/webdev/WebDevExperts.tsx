import React from 'react';
import { Star } from 'lucide-react';

const experts = [
  {
    name: 'Alex Thompson',
    title: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    projectCount: 156,
    specialties: ['React', 'Node.js', 'Python']
  },
  {
    name: 'Sarah Chen',
    title: 'Frontend Specialist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    projectCount: 142,
    specialties: ['Vue.js', 'CSS', 'UI/UX']
  },
  {
    name: 'Marcus Rodriguez',
    title: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    projectCount: 178,
    specialties: ['Java', 'Spring', 'AWS']
  }
];

export function WebDevExperts() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Web Development Experts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Work with top-rated developers who deliver exceptional results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <div key={expert.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {expert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{expert.title}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 font-medium">{expert.rating}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>{expert.projectCount} projects</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {expert.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}