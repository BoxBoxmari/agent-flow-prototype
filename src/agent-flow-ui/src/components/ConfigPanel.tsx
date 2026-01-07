import { Settings, X } from 'lucide-react';

export const ConfigPanel = () => {
  return (
    <div className="absolute right-4 top-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-slate-500" />
          <h3 className="font-semibold text-slate-800 text-sm">Node Configuration</h3>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Agent Name</label>
          <input 
            type="text" 
            defaultValue="Web Scraper 01"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Model Provider</label>
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>OpenAI GPT-4</option>
            <option>Anthropic Claude 3.5</option>
            <option>Llama 3 Local</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">System Prompt</label>
          <textarea 
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            defaultValue="You are a helpful assistant capable of extracting structured data from unstructured HTML content."
          />
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="stream" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <label htmlFor="stream" className="text-xs text-slate-600">Enable Streaming Response</label>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
        <button className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800">Reset</button>
        <button className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm">Save Changes</button>
      </div>
    </div>
  );
};
