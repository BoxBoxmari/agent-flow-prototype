import React from 'react';
import { Bot, FileText, Database, Globe, MessageSquare } from 'lucide-react';

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const agents = [
    { type: 'agent', label: 'Web Scraper', icon: Globe, description: 'Extract data from websites' },
    { type: 'agent', label: 'LLM Processor', icon: Bot, description: 'Process text with AI models' },
    { type: 'agent', label: 'Database Connector', icon: Database, description: 'Read/Write to database' },
    { type: 'agent', label: 'Text Parser', icon: FileText, description: 'Parse and format text' },
    { type: 'agent', label: 'Chat Interface', icon: MessageSquare, description: 'User interaction point' },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 h-screen p-4 flex flex-col font-sans">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Agent Toolkit</h2>
      <p className="text-xs text-slate-500 mb-4">Drag and drop agents to the canvas to build your workflow.</p>
      
      <div className="flex flex-col gap-3">
        {agents.map((agent) => (
          <div
            key={agent.label}
            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm cursor-grab hover:shadow-md hover:border-blue-400 transition-all"
            onDragStart={(event) => onDragStart(event, 'agent', agent.label)}
            draggable
          >
            <div className="bg-blue-100 p-2 rounded-md">
              <agent.icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-700">{agent.label}</div>
              <div className="text-[10px] text-slate-500">{agent.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-400 text-center">
          Workflow Builder v0.1
        </div>
      </div>
    </aside>
  );
};
