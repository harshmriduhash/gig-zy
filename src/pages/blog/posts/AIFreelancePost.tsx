import React from 'react';
import { BlogPostHeader } from '../../../components/blog/BlogPostHeader';
import { BlogContent } from '../../../components/blog/BlogContent';
import { blogPosts } from '../../../data/mockData';
import { aiFreelanceContent } from '../../../data/blog/aiFreelanceContent';

export function AIFreelancePost() {
  const post = blogPosts[0]; // Get the AI transformation post

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BlogPostHeader {...post} />
      <BlogContent content={aiFreelanceContent} />
    </article>
  );
}