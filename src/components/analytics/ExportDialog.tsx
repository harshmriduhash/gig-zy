import React, { useState, useEffect } from 'react';
import { Download, X, Calendar, FileText, Clock, Template } from 'lucide-react';
import { useAnalyticsExport } from '../../hooks/useAnalyticsExport';

interface ExportDialogProps {
  onClose: () => void;
}

export function ExportDialog({ onClose }: ExportDialogProps) {
  const { exportData, scheduleExport, saveTemplate, getTemplates } = useAnalyticsExport();
  const [format, setFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'revenue',
    'users',
    'projects'
  ]);
  const [isExporting, setIsExporting] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedule, setSchedule] = useState({
    frequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    email: ''
  });
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const templates = await getTemplates();
      setTemplates(templates);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      if (showSchedule) {
        await scheduleExport({
          format,
          dateRange,
          metrics: selectedMetrics,
          template: selectedTemplate,
          schedule
        });
        onClose();
        return;
      }

      const data = await exportData({
        format,
        dateRange,
        metrics: selectedMetrics,
        template: selectedTemplate
      });

      if (format === 'pdf') {
        (data as any).save('analytics-export.pdf');
      } else {
        // Create and download file
        const blob = new Blob([data as string], { 
          type: format === 'csv' ? 'text/csv' : 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-export-${new Date().toISOString()}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveTemplate = async () => {
    try {
      await saveTemplate({
        name: templateName,
        format,
        metrics: selectedMetrics,
        layout: 'default'
      });
      await loadTemplates();
      setShowSaveTemplate(false);
      setTemplateName('');
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Export Analytics Data
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Export Format
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="csv"
                    checked={format === 'csv'}
                    onChange={(e) => setFormat(e.target.value as 'csv')}
                    className="mr-2"
                  />
                  <FileText className="h-4 w-4 mr-1" />
                  CSV
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="json"
                    checked={format === 'json'}
                    onChange={(e) => setFormat(e.target.value as 'json')}
                    className="mr-2"
                  />
                  <FileText className="h-4 w-4 mr-1" />
                  JSON
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={(e) => setFormat(e.target.value as 'pdf')}
                    className="mr-2"
                  />
                  <FileText className="h-4 w-4 mr-1" />
                  PDF
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
              >
                <option value="">Default Template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowSaveTemplate(true)}
                className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                <Template className="h-4 w-4 inline-block mr-1" />
                Save Current Settings as Template
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start.toISOString().split('T')[0]}
                    onChange={(e) => setDateRange(prev => ({
                      ...prev,
                      start: new Date(e.target.value)
                    }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end.toISOString().split('T')[0]}
                    onChange={(e) => setDateRange(prev => ({
                      ...prev,
                      end: new Date(e.target.value)
                    }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Metrics to Export
              </label>
              <div className="space-y-2">
                {[
                  { id: 'revenue', label: 'Revenue Data' },
                  { id: 'users', label: 'User Analytics' },
                  { id: 'projects', label: 'Project Statistics' }
                ].map((metric) => (
                  <label key={metric.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMetrics(prev => [...prev, metric.id]);
                        } else {
                          setSelectedMetrics(prev => prev.filter(id => id !== metric.id));
                        }
                      }}
                      className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {metric.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                <Clock className="h-4 w-4 mr-1" />
                {showSchedule ? 'Cancel Scheduling' : 'Schedule Export'}
              </button>

              {showSchedule && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Frequency
                    </label>
                    <select
                      value={schedule.frequency}
                      onChange={(e) => setSchedule(prev => ({
                        ...prev,
                        frequency: e.target.value as 'daily' | 'weekly' | 'monthly'
                      }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={schedule.email}
                      onChange={(e) => setSchedule(prev => ({
                        ...prev,
                        email: e.target.value
                      }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleExport}
              disabled={isExporting || selectedMetrics.length === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {showSchedule ? 'Scheduling...' : 'Exporting...'}
                </>
              ) : (
                <>
                  {showSchedule ? (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule Export
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export Now
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Save Template Dialog */}
        {showSaveTemplate && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50" onClick={() => setShowSaveTemplate(false)} />
              
              <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Save Export Template
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Template Name
                      </label>
                      <input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
                        placeholder="Enter template name"
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowSaveTemplate(false)}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveTemplate}
                        disabled={!templateName}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                      >
                        Save Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}