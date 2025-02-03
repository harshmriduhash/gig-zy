import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './navigation/SearchBar';
import { CategoryRibbon } from './navigation/CategoryRibbon';

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30" className="text-indigo-600 dark:text-indigo-400">
                <defs>
                  <clipPath id="logo-clip">
                    <path d="M 0.484375 0 L 29.515625 0 L 29.515625 29 L 0.484375 29 Z M 0.484375 0" clipRule="nonzero"/>
                  </clipPath>
                </defs>
                <g clipPath="url(#logo-clip)" className="fill-current">
                  <path d="M15 2C7.832 2 2 7.832 2 15C2 22.168 7.832 28 15 28C22.168 28 28 22.168 28 15C28 7.832 22.168 2 15 2ZM15 26C8.935 26 4 21.065 4 15C4 8.935 8.935 4 15 4C21.065 4 26 8.935 26 15C26 21.065 21.065 26 15 26ZM15 8C11.141 8 8 11.141 8 15C8 18.859 11.141 22 15 22C18.859 22 22 18.859 22 15C22 11.141 18.859 8 15 8ZM15 20C12.243 20 10 17.757 10 15C10 12.243 12.243 10 15 10C17.757 10 20 12.243 20 15C20 17.757 17.757 20 15 20Z"/>
                </g>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Gigzy</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link 
                to="/find-work" 
                className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Find Work
              </Link>
              <Link 
                to="/post-project" 
                className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Post a Project
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar />
            <ThemeToggle />
            <div className="flex items-center space-x-3">
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/70"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <UserCircle className="h-5 w-5 mr-2" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CategoryRibbon />
    </header>
  );
}