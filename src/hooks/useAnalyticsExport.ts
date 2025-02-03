import { supabase } from '../lib/supabase/client';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface ExportOptions {
  format: 'csv' | 'json' | 'pdf';
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: string[];
  template?: string;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    email: string;
  };
}

interface ExportTemplate {
  id: string;
  name: string;
  format: 'csv' | 'json' | 'pdf';
  metrics: string[];
  layout?: 'default' | 'compact' | 'detailed';
}

export function useAnalyticsExport() {
  const exportData = async (options: ExportOptions) => {
    try {
      const { start, end } = options.dateRange;

      // Fetch data based on selected metrics
      const promises = options.metrics.map(async (metric) => {
        switch (metric) {
          case 'revenue':
            return supabase
              .from('transactions')
              .select('amount, created_at, status')
              .gte('created_at', start.toISOString())
              .lte('created_at', end.toISOString())
              .order('created_at');
          
          case 'users':
            return supabase
              .from('users')
              .select('created_at, status')
              .gte('created_at', start.toISOString())
              .lte('created_at', end.toISOString())
              .order('created_at');
          
          case 'projects':
            return supabase
              .from('projects')
              .select('created_at, status, budget_min, budget_max')
              .gte('created_at', start.toISOString())
              .lte('created_at', end.toISOString())
              .order('created_at');
          
          default:
            return null;
        }
      });

      const results = await Promise.all(promises);
      const data = results.reduce((acc, result, index) => {
        if (result?.data) {
          acc[options.metrics[index]] = result.data;
        }
        return acc;
      }, {} as Record<string, any[]>);

      // Format data based on export type
      switch (options.format) {
        case 'csv':
          return formatAsCSV(data);
        case 'pdf':
          return generatePDF(data, options.template);
        default:
          return JSON.stringify(data, null, 2);
      }
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  };

  const scheduleExport = async (options: ExportOptions) => {
    if (!options.schedule) return;

    try {
      const { data, error } = await supabase
        .from('scheduled_exports')
        .insert({
          frequency: options.schedule.frequency,
          email: options.schedule.email,
          format: options.format,
          metrics: options.metrics,
          template: options.template,
          next_run: calculateNextRun(options.schedule.frequency)
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Schedule export error:', error);
      throw error;
    }
  };

  const saveTemplate = async (template: Omit<ExportTemplate, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('export_templates')
        .insert(template)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Save template error:', error);
      throw error;
    }
  };

  const getTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('export_templates')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get templates error:', error);
      throw error;
    }
  };

  return { exportData, scheduleExport, saveTemplate, getTemplates };
}

function formatAsCSV(data: Record<string, any[]>): string {
  const csvRows: string[] = [];

  Object.entries(data).forEach(([metric, rows]) => {
    csvRows.push(`\n${metric.toUpperCase()}`);
    
    if (rows.length === 0) return;

    const headers = Object.keys(rows[0]);
    csvRows.push(headers.join(','));

    rows.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    });
  });

  return csvRows.join('\n');
}

function generatePDF(data: Record<string, any[]>, template = 'default'): jsPDF {
  const doc = new jsPDF();
  let yOffset = 20;

  // Add header
  doc.setFontSize(20);
  doc.text('Analytics Report', 20, yOffset);
  yOffset += 20;

  // Add date range
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yOffset);
  yOffset += 20;

  // Add data tables
  Object.entries(data).forEach(([metric, rows]) => {
    if (rows.length === 0) return;

    doc.setFontSize(16);
    doc.text(metric.toUpperCase(), 20, yOffset);
    yOffset += 10;

    const headers = Object.keys(rows[0]);
    const tableData = rows.map(row => headers.map(header => row[header]));

    (doc as any).autoTable({
      head: [headers],
      body: tableData,
      startY: yOffset,
      theme: template === 'compact' ? 'plain' : 'striped',
      styles: {
        fontSize: 10,
        cellPadding: template === 'compact' ? 2 : 3
      }
    });

    yOffset = (doc as any).lastAutoTable.finalY + 20;
  });

  return doc;
}

function calculateNextRun(frequency: 'daily' | 'weekly' | 'monthly'): Date {
  const now = new Date();
  const next = new Date();

  switch (frequency) {
    case 'daily':
      next.setDate(now.getDate() + 1);
      next.setHours(0, 0, 0, 0);
      break;
    case 'weekly':
      next.setDate(now.getDate() + (7 - now.getDay()));
      next.setHours(0, 0, 0, 0);
      break;
    case 'monthly':
      next.setMonth(now.getMonth() + 1);
      next.setDate(1);
      next.setHours(0, 0, 0, 0);
      break;
  }

  return next;
}