import React from 'react';
import { BlogCard } from '../../components/blog/BlogCard';
import { blogPosts } from '../../data/mockData';

export function BlogArchivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 pl-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Archive</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Explore our latest articles and insights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} size="large" />
        ))}
      </div>
    </div>
  );
}