import React from 'react';

interface BlogPostHeaderProps {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  category: string;
  imageUrl: string;
}

export function BlogPostHeader({ title, author, publishDate, category, imageUrl }: BlogPostHeaderProps) {
  return (
    <header className="mb-8">
      <div className="relative h-[400px] mb-8">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="max-w-3xl mx-auto">
        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
          {category}
        </span>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <div className="mt-4 flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {publishDate}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}