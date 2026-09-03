import { useState, useEffect } from 'react';
import type { Role, ConversationId } from '@/lib/types';
import { Bolt Database } from '@/lib/supabase';
import { RoleSelect } from '@/components/RoleSelect';
import { ConversationList } from '@/components/ConversationList';
import { ChatScreen } from '@/components/ChatScreen';
import { AttendantPanel } from '@/components/AttendantPanel';
import { CONVERSATIONS } from '@/lib/constants';
import { LogOut, ChefHat, ShoppingBag } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [customerName, setCustomerName] = useState('Aluno');
  const [activeConversation, setActiveConversation] = useState<ConversationId | null>(null);
  const [lastMessages, setLastMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!role) return;
    (async () => {
      const updates: Record<string, string> = {};
      for (const conv of CONVERSATIONS) {
        const { data } = await supabase.from('messages').select('content, kind')
          .eq('conversation_id', conv.id).order('created_at', { ascending: false }).limit(1);
        if (data && data.length > 0) updates[conv.id] = data[0].content || 'Interactive message';
      }
      setLastMessages(updates);
    })();
  }, [role]);

  if (!role) return <RoleSelect onSelect={(r, name) => { setRole(r); setCustomerName(name); }} />;

  if (role === 'attendant') {
    return <div className="h-screen flex flex-col"><div className="flex-1 overflow-hidden">
      <AttendantPanel onBack={() => setRole(null)} /></div></div>;
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-chat-700 px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-chat-200 text-xs">Logado como:</span>
          <span className="text-white text-xs font-medium flex items-center gap-1">
            <ShoppingBag className="w-3.5 h-3.5" /> {customerName}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setRole('attendant'); setCustomerName('Cantina'); }}
            className="flex items-center gap-1 text-chat-200 hover:text-white text-xs px-2 py-1 rounded-full hover:bg-white/10 transition-colors">
            <ChefHat className="w-3.5 h-3.5" /> Painel</button>
          <button onClick={() => setRole(null)}
            className="flex items-center gap-1 text-chat-200 hover:text-white text-xs px-2 py-1 rounded-full hover:bg-white/10 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sair</button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {activeConversation ? (
          <ChatScreen conversationId={activeConversation} onBack={() => setActiveConversation(null)} customerName={customerName} />
        ) : (
          <div className="h-full overflow-y-auto scrollbar-thin">
            <ConversationList conversations={CONVERSATIONS} onSelect={(id) => setActiveConversation(id as ConversationId)}
              unreadCounts={{}} lastMessages={lastMessages} />
          </div>
        )}
      </div>
    </div>
  );
}
