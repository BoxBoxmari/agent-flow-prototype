import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Bot, FileText, Database, Globe, MessageSquare, MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';

const icons: Record<string, React.ElementType> = {
  'Web Scraper': Globe,
  'LLM Processor': Bot,
  'Database Connector': Database,
  'Text Parser': FileText,
  'Chat Interface': MessageSquare,
};

const AgentNode = ({ data, selected }: NodeProps) => {
  const Icon = icons[data.label as string] || Bot;
  
  return (
    <div 
      className={clsx(
        "min-w-[200px] bg-white rounded-xl shadow-lg border-2 transition-all duration-200",
        selected ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200 hover:border-slate-300"
      )}
    >
      <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            {data.label as string}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-slate-500 font-medium">Status: Idle</div>
        <div className="mt-2 text-[10px] text-slate-400">
          {data.description as string || "Ready to process"}
        </div>
      </div>

      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 !bg-slate-400 !border-2 !border-white" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 !bg-blue-500 !border-2 !border-white" 
      />
    </div>
  );
};

export default memo(AgentNode);
