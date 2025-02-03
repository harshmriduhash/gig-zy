import React from 'react';
import { ProjectCard } from '../ProjectCard';
import { FreelancerCard } from '../FreelancerCard';
import { featuredProjects, topFreelancers } from '../../data/mockData';

export function FeaturedSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Expert Freelancers and Exciting Opportunities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect with top talent and find your next opportunity
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Top Freelancers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </div>
      </div>
    </section>
  );
}