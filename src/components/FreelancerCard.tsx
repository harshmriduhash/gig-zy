import React from "react";
import { Star, CheckCircle } from "lucide-react";
import type { FreelancerProfile } from "../types";

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <img
          src={freelancer.avatarUrl}
          alt={freelancer.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {freelancer.name}
          </h3>
          <p className="text-gray-600 dark:text-white">{freelancer.title}</p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <Star className="h-5 w-5 text-yellow-400" />
        <span className="font-medium text-gray-900 dark:text-white ml-1">
          {freelancer.rating.toFixed(1)}
        </span>
        <span className="mx-2 text-gray-400 dark:text-white/60">•</span>
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
        <span className="text-gray-700 dark:text-white ml-1">
          {freelancer.completedProjects} projects
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-white rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${freelancer.hourlyRate}
          </span>
          <span className="text-gray-600 dark:text-white/80">/hr</span>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors">
          Hire Me
        </button>
      </div>
    </div>
  );
}
