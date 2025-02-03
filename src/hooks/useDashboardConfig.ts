import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export interface DashboardWidget {
  id: string;
  type: 'metrics' | 'lineChart' | 'barChart' | 'pieChart' | 'heatMap' | 'topPerformers';
  title: string;
  size: 'small' | 'medium' | 'large';
  config: {
    metrics?: string[];
    timeframe?: string;
    comparison?: string;
    chartType?: string;
    colorScheme?: string[];
    [key: string]: any;
  };
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface DashboardLayout {
  id: string;
  name: string;
  description?: string;
  widgets: DashboardWidget[];
  isDefault?: boolean;
}

export function useDashboardConfig() {
  const [layouts, setLayouts] = useState<DashboardLayout[]>([]);
  const [activeLayout, setActiveLayout] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadLayouts();
  }, []);

  const loadLayouts = async () => {
    try {
      const { data: userLayouts, error: layoutsError } = await supabase
        .from('dashboard_layouts')
        .select('*')
        .order('created_at', { ascending: false });

      if (layoutsError) throw layoutsError;

      setLayouts(userLayouts || []);

      // Set active layout to default or first available
      const defaultLayout = userLayouts?.find(l => l.isDefault);
      setActiveLayout(defaultLayout?.id || userLayouts?.[0]?.id || null);
    } catch (err) {
      console.error('Error loading dashboard layouts:', err);
      setError(err instanceof Error ? err : new Error('Failed to load dashboard layouts'));
    } finally {
      setIsLoading(false);
    }
  };

  const saveLayout = async (layout: Omit<DashboardLayout, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('dashboard_layouts')
        .insert(layout)
        .select()
        .single();

      if (error) throw error;

      setLayouts(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Error saving dashboard layout:', err);
      throw err;
    }
  };

  const updateLayout = async (id: string, updates: Partial<DashboardLayout>) => {
    try {
      const { data, error } = await supabase
        .from('dashboard_layouts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setLayouts(prev => prev.map(l => l.id === id ? data : l));
      return data;
    } catch (err) {
      console.error('Error updating dashboard layout:', err);
      throw err;
    }
  };

  const deleteLayout = async (id: string) => {
    try {
      const { error } = await supabase
        .from('dashboard_layouts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLayouts(prev => prev.filter(l => l.id !== id));
      
      // If active layout was deleted, switch to another one
      if (activeLayout === id) {
        const remainingLayouts = layouts.filter(l => l.id !== id);
        setActiveLayout(remainingLayouts[0]?.id || null);
      }
    } catch (err) {
      console.error('Error deleting dashboard layout:', err);
      throw err;
    }
  };

  const setDefaultLayout = async (id: string) => {
    try {
      // Remove default from all layouts
      await supabase
        .from('dashboard_layouts')
        .update({ isDefault: false })
        .neq('id', id);

      // Set new default
      const { error } = await supabase
        .from('dashboard_layouts')
        .update({ isDefault: true })
        .eq('id', id);

      if (error) throw error;

      setLayouts(prev => prev.map(l => ({
        ...l,
        isDefault: l.id === id
      })));
    } catch (err) {
      console.error('Error setting default layout:', err);
      throw err;
    }
  };

  return {
    layouts,
    activeLayout,
    isLoading,
    error,
    setActiveLayout,
    saveLayout,
    updateLayout,
    deleteLayout,
    setDefaultLayout
  };
}