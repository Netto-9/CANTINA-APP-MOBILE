import type { Conversation } from '@/lib/types';
import { ShoppingBag, HelpCircle, ClipboardList } from 'lucide-react';

const ICONS: Record<string, typeof ShoppingBag> = { ShoppingBag, HelpCircle, ClipboardList };

interface ConversationListProps {
  conversations: Conversation[]; onSelect: (id: string) => void;
  unreadCounts: Record<string, number>; lastMessages: Record<string, string>;
}

export function ConversationList({ conversations, onSelect, unreadCounts, lastMessages }: ConversationListProps) {
  return (
    <div className="bg-white">
      <div className="bg-chat-600 px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🍔</div>
        <div><h1 className="text-white font-bold text-lg leading-tight">CantinaFlow</h1>
          <p className="text-chat-100 text-xs">Cantina Escolar</p></div>
      </div>
      <div className="px-4 py-2 bg-chat-50 border-b border-gray-100">
        <p className="text-xs text-gray-500 font-medium">Conversas fixas</p></div>
      <div className="divide-y divide-gray-100">
        {conversations.map((conv) => {
          const Icon = ICONS[conv.icon] || ShoppingBag;
          const unread = unreadCounts[conv.id] || 0;
          const lastMsg = lastMessages[conv.id];
          return (
            <button key={conv.id} onClick={() => onSelect(conv.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-chat-50 transition-colors text-left active:bg-chat-100">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-chat-100 flex items-center justify-center text-2xl">{conv.avatar}</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-chat-500 border-2 border-white flex items-center justify-center">
                  <Icon className="w-3 h-3 text-white" /></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{conv.name}</h3>
                  {unread > 0 && <span className="bg-canteen-500 text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">{unread}</span>}
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{lastMsg || conv.description}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="px-4 py-8 text-center"><p className="text-xs text-gray-400">Faça seus pedidos de forma rápida e fácil pelo chat</p></div>
    </div>
  );
}
