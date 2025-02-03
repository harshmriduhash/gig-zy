import { Bot, Workflow, LineChart, Link, Database, Mail, CheckSquare } from 'lucide-react';
import type { ServiceCategory } from '../types';

export const automationServices: ServiceCategory = {
  id: 'ai-automation',
  name: 'Automation & Workflow Solutions',
  icon: Workflow,
  description: 'Streamline your business operations with intelligent automation solutions',
  subcategories: [
    {
      id: 'process-automation',
      name: 'Process Automation Services',
      services: [
        { id: 'task-automation', name: 'AI-Powered Task Automation', path: '/services/automation/task-automation' },
        { id: 'intelligent-routing', name: 'Intelligent Task Routing', path: '/services/automation/task-routing' },
        { id: 'workflow-automation', name: 'Business Workflow Automation', path: '/services/automation/workflow' }
      ]
    },
    {
      id: 'chatbots-assistants',
      name: 'AI-Powered Chatbots & Assistants',
      services: [
        { id: 'support-bots', name: 'Customer Support Chatbots', path: '/services/automation/support-bots' },
        { id: 'workflow-assistants', name: 'Workflow Assistants', path: '/services/automation/workflow-assistants' },
        { id: 'multilingual-agents', name: 'Multilingual Virtual Agents', path: '/services/automation/multilingual-agents' }
      ]
    },
    {
      id: 'workflow-optimization',
      name: 'Predictive Workflow Optimization',
      services: [
        { id: 'bottleneck-prediction', name: 'Bottleneck Prediction', path: '/services/automation/bottleneck-prediction' },
        { id: 'resource-allocation', name: 'Smart Resource Allocation', path: '/services/automation/resource-allocation' },
        { id: 'automated-reporting', name: 'Automated Analytics & Reporting', path: '/services/automation/automated-reporting' }
      ]
    },
    {
      id: 'api-integration',
      name: 'API & Software Integration',
      services: [
        { id: 'platform-integration', name: 'Platform Integration (CRM, ERP)', path: '/services/automation/platform-integration' },
        { id: 'api-automation', name: 'API Automation Solutions', path: '/services/automation/api-automation' },
        { id: 'third-party-connect', name: 'Third-Party App Integration', path: '/services/automation/third-party-connect' }
      ]
    },
    {
      id: 'data-processing',
      name: 'Automated Data Processing',
      services: [
        { id: 'data-extraction', name: 'Real-time Data Extraction', path: '/services/automation/data-extraction' },
        { id: 'document-processing', name: 'Automated Document Processing', path: '/services/automation/document-processing' },
        { id: 'decision-workflows', name: 'Data-Driven Decision Workflows', path: '/services/automation/decision-workflows' }
      ]
    },
    {
      id: 'marketing-automation',
      name: 'Marketing & Sales Automation',
      services: [
        { id: 'email-automation', name: 'AI-Driven Email Campaigns', path: '/services/automation/email-automation' },
        { id: 'lead-automation', name: 'Lead Scoring & Nurturing', path: '/services/automation/lead-automation' },
        { id: 'sales-insights', name: 'Predictive Sales Analytics', path: '/services/automation/sales-insights' }
      ]
    },
    {
      id: 'workflow-management',
      name: 'Workflow Management Solutions',
      services: [
        { id: 'task-tracking', name: 'AI Task Tracking', path: '/services/automation/task-tracking' },
        { id: 'smart-notifications', name: 'Smart Notifications System', path: '/services/automation/smart-notifications' },
        { id: 'task-prioritization', name: 'Intelligent Task Prioritization', path: '/services/automation/task-prioritization' }
      ]
    }
  ]
};