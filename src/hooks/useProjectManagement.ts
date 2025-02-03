```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface TimeEntry {
  id: string;
  project_id: string;
  user_id: string;
  task: string;
  start_time: string;
  end_time: string | null;
  duration: number;
}

interface ProjectTemplate {
  id: string;
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

export function useProjectManagement() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadTimeEntries();
    loadTemplates();
  }, []);

  const loadTimeEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .order('start_time', { ascending: false });

      if (error) throw error;
      setTimeEntries(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load time entries'));
    }
  };

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('project_templates')
        .select('*')
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load templates'));
    } finally {
      setIsLoading(false);
    }
  };

  const startTimeTracking = async (projectId: string, task: string) => {
    try {
      const { data, error } = await supabase
        .from('time_entries')
        .insert({
          project_id: projectId,
          task,
          start_time: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      setTimeEntries([data, ...timeEntries]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to start time tracking');
    }
  };

  const stopTimeTracking = async (entryId: string) => {
    try {
      const endTime = new Date().toISOString();
      const { data, error } = await supabase
        .from('time_entries')
        .update({
          end_time: endTime,
          duration: calculateDuration(timeEntries.find(e => e.id === entryId)?.start_time || '', endTime)
        })
        .eq('id', entryId)
        .select()
        .single();

      if (error) throw error;
      setTimeEntries(timeEntries.map(entry => 
        entry.id === entryId ? data : entry
      ));
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to stop time tracking');
    }
  };

  const saveTemplate = async (template: Omit<ProjectTemplate, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('project_templates')
        .insert(template)
        .select()
        .single();

      if (error) throw error;
      setTemplates([...templates, data]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to save template');
    }
  };

  const createProjectFromTemplate = async (templateId: string, projectData: any) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) throw new Error('Template not found');

      // Create project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          ...projectData,
          template_id: templateId
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Create tasks
      const taskPromises = template.tasks.map(task =>
        supabase
          .from('project_tasks')
          .insert({
            project_id: project.id,
            ...task
          })
      );

      // Create milestones
      const milestonePromises = template.milestones.map(milestone => {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + milestone.due_days);
        
        return supabase
          .from('milestones')
          .insert({
            project_id: project.id,
            ...milestone,
            due_date: dueDate.toISOString()
          });
      });

      await Promise.all([...taskPromises, ...milestonePromises]);
      return project;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create project from template');
    }
  };

  return {
    timeEntries,
    templates,
    isLoading,
    error,
    startTimeTracking,
    stopTimeTracking,
    saveTemplate,
    createProjectFromTemplate
  };
}

function calculateDuration(startTime: string, endTime: string): number {
  return Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000);
}
```