import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps { onSend: (text: string) => void; placeholder?: string; disabled?: boolean; }

export function ChatInput({ onSend, placeholder = 'Digite uma mensagem...', disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 100)}px`;
    }
  }, [text]);

  const handleSend = () => { const t = text.trim(); if (!t || disabled) return; onSend(t); setText(''); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <div className="bg-gray-50 border-t border-gray-200 px-3 py-2.5 flex items-end gap-2">
      <textarea ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown}
        placeholder={placeholder} disabled={disabled} rows={1}
        className="flex-1 resize-none bg-white rounded-2xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:border-chat-400 focus:ring-1 focus:ring-chat-400 transition-colors scrollbar-thin disabled:opacity-50" />
      <button onClick={handleSend} disabled={!text.trim() || disabled}
        className="shrink-0 w-10 h-10 rounded-full bg-chat-500 hover:bg-chat-600 disabled:bg-gray-300 flex items-center justify-center transition-colors active:scale-95">
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
