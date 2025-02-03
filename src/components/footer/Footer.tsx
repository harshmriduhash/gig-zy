import React from 'react';
import { FooterColumn } from './FooterColumn';
import { footerLinks } from './data/footerLinks';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <FooterColumn title="Categories" links={footerLinks.categories} />
          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} Gigzy AI Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}