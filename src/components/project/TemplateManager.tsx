```typescript
import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { useProjectManagement } from '../../hooks/useProjectManagement';

interface TemplateFormData {
  name: string;
  description: string;
  tasks: Array<{
    title: string;
    description: string;
    estimated_hours: number;
  }>;
  milestones: Array<{
    title: string;
    description: string;
    due_days: number;
  }>;
}

export function TemplateManager() {
  const { templates, saveTemplate, createProjectFromTemplate } = useProjectManagement();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: '',
    tasks: [],
    milestones: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveTemplate(formData);
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        tasks: [],
        milestones: []
      });
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        { title: '', description: '', estimated_hours: 0 }
      ]
    }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { title: '', description: '', due_days: 0 }
      ]
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Project Templates
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </button>
        </div>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Template Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={3}
            />
          </div>

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tasks
              </label>
              <button
                type="button"
                onClick={addTask}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                Add Task
              </button>
            </div>
            <div className="space-y-4">
              {formData.tasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => {
                        const newTasks = [...formData.tasks];
                        newTasks[index].title = e.target.value;
                        setFormData(prev => ({ ...prev, tasks: newTasks }));
                      }}
                      placeholder="Task title"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <textarea
                      value={task.description}
                      onChange={(e) => {
                        const newTasks = [...formData.tasks];
                        newTasks[index].description = e.target.value;
                        setFormData(prev => ({ ...prev, tasks: newTasks }));
                      }}
                      placeholder="Task description"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={2}
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={task.estimated_hours}
                      onChange={(e) => {
                        const newTasks = [...formData.tasks];
                        newTasks[index].estimated_hours = Number(e.target.value);
                        setFormData(prev => ({ ...prev, tasks: newTasks }));
                      }}
                      placeholder="Hours"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newTasks = formData.tasks.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, tasks: newTasks }));
                    }}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Milestones
              </label>
              <button
                type="button"
                onClick={addMilestone}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                Add Milestone
              </button>
            </div>
            <div className="space-y-4">
              {formData.milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].title = e.target.value;
                        setFormData(prev => ({ ...prev, milestones: newMilestones }));
                      }}
                      placeholder="Milestone title"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <textarea
                      value={milestone.description}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].description = e.target.value;
                        setFormData(prev => ({ ...prev, milestones: newMilestones }));
                      }}
                      placeholder="Milestone description"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={2}
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={milestone.due_days}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].due_days = Number(e.target.value);
                        setFormData(prev => ({ ...prev, milestones: newMilestones }));
                      }}
                      placeholder="Days"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newMilestones = formData.milestones.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, milestones: newMilestones }));
                    }}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-gray-50 dark Continuing the TemplateManager.tsx file content from where it left off:

```typescript
                key={template.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {template.description}
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {template.tasks.length} Tasks
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {template.milestones.length} Milestones
                  </div>
                </div>
                <button
                  onClick={() => createProjectFromTemplate(template.id, {
                    title: `New Project from ${template.name}`,
                    status: 'draft'
                  })}
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```