import React from 'react';
import { Users, Briefcase, AlertTriangle, BarChart2, FileText } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const sections = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'projects', name: 'Project Management', icon: Briefcase },
    { id: 'disputes', name: 'Dispute Resolution', icon: AlertTriangle },
    { id: 'content', name: 'Content Management', icon: FileText },
    { id: 'analytics', name: 'Analytics & Reports', icon: BarChart2 }
  ];

  return (
    <nav className="w-64 flex-shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
              activeSection === section.id
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
                : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <section.icon className="h-5 w-5 mr-3" />
            {section.name}
          </button>
        ))}
      </div>
    </nav>
  );
}