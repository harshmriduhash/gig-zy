import React from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../../types";

interface BlogCardProps {
  post: BlogPost;
  size?: "small" | "medium" | "large";
}

export function BlogCard({ post, size = "medium" }: BlogCardProps) {
  return (
    <Link to={`/blog/posts/${post.id}`} className="block">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-56">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            {post.category}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
            {post.title}
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.publishDate}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
