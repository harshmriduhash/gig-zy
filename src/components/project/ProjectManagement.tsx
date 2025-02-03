```typescript
import React, { useState } from 'react';
import { FileManager } from './FileManager';
import { TimeTracker } from './TimeTracker';
import { TemplateManager } from './TemplateManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Files, Clock, Layout } from 'lucide-react';

interface ProjectManagementProps {
  projectId: string;
}

export function ProjectManagement({ projectId }: ProjectManagementProps) {
  const [activeTab, setActiveTab] = useState('files');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="border-b border-gray-200 dark:border-gray-700">
          <TabsTrigger value="files" className="inline-flex items-center px-4 py-2 text-sm font-medium">
            <Files className="h-4 w-4 mr-2" />
            Files
          </TabsTrigger>
          <TabsTrigger value="time" className="inline-flex items-center px-4 py-2 text-sm font-medium">
            <Clock className="h-4 w-4 mr-2" />
            Time Tracking
          </TabsTrigger>
          <TabsTrigger value="templates" className="inline-flex items-center px-4 py-2 text-sm font-medium">
            <Layout className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files">
          <FileManager projectId={projectId} />
        </TabsContent>

        <TabsContent value="time">
          <TimeTracker projectId={projectId} />
        </TabsContent>

        <TabsContent value="templates">
          <TemplateManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```