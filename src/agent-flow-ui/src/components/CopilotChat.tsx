import { useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import clsx from 'clsx';

export const CopilotChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you build this workflow. Try saying "Create a workflow that scrapes TechCrunch and summarizes the news".' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "I've updated the canvas with a Web Scraper connected to an LLM Processor as requested." }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold text-sm">AI Architect</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={clsx("max-w-[85%] p-3 rounded-2xl text-sm", 
                msg.role === 'user' 
                  ? "bg-violet-600 text-white self-end rounded-br-none" 
                  : "bg-white border border-slate-200 text-slate-700 self-start rounded-bl-none shadow-sm"
              )}>
                {msg.content}
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-violet-500 focus-within:bg-white transition-all">
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
                placeholder="Describe your workflow..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="text-violet-600 hover:text-violet-700">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>
    </div>
  );
};
