import React from "react";
import { BookOpen } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { blogPosts } from "../../data/mockData";

export function BlogSection() {
  return (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        <div className="pl-[40px]">
          <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Latest from Our Blog
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard post={blogPosts[0]} size="large" />
        <BlogCard post={blogPosts[1]} size="medium" />
        <BlogCard post={blogPosts[2]} size="small" />
      </div>
    </section>
  );
}
