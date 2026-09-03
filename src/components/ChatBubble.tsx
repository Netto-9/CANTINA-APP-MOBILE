import { useEffect, useRef } from 'react';
import type { ChatMessage, CartItem } from '@/lib/types';
import { formatPrice, STATUS_LABELS } from '@/lib/constants';
import { Check, QrCode } from 'lucide-react';

interface ChatBubbleProps { message: ChatMessage; isLastFromSender: boolean; }

function StatusTicks({ message }: { message: ChatMessage }) {
  if (message.sender !== 'user') return null;
  return (<span className="inline-flex items-center gap-0.5 ml-1 align-bottom">
    <Check className="w-3.5 h-3.5 text-canteen-300" />
    <Check className="w-3.5 h-3.5 text-canteen-300 -ml-2.5" />
  </span>);
}

export function ChatBubble({ message, isLastFromSender }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  const isAttendant = message.sender === 'attendant';
  const bubbleBg = isUser ? 'bg-canteen-100 text-gray-800' : isAttendant ? 'bg-green-100 text-gray-800' : 'bg-white text-gray-800';

  const renderContent = () => {
    switch (message.kind) {
      case 'menu': {
        const items = (message.metadata?.items as CartItem[]) || [];
        return (<div className="space-y-2"><p className="text-sm font-medium text-chat-900 mb-1">{message.content}</p>
          <div className="space-y-1.5">{items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white/60 rounded-lg p-2 text-xs">
              <span className="text-lg">{item.menuItem.emoji}</span>
              <div className="flex-1"><p className="font-medium text-gray-800">{item.menuItem.name}</p><p className="text-gray-500">{item.menuItem.description}</p></div>
              <span className="font-semibold text-canteen-600">{formatPrice(item.menuItem.price)}</span>
            </div>))}</div></div>);
      }
      case 'order_summary': {
        const items = (message.metadata?.items as { name:string; quantity:number; subtotal:number }[]) || [];
        const total = (message.metadata?.total as number) || 0;
        return (<div className="space-y-2"><p className="text-sm font-semibold text-chat-900">{message.content}</p>
          <div className="bg-white/50 rounded-lg p-2.5 space-y-1">
            {items.map((item, idx) => (<div key={idx} className="flex justify-between text-xs text-gray-700">
              <span>{item.quantity}x {item.name}</span><span className="font-medium">{formatPrice(item.subtotal)}</span></div>))}
            <div className="border-t border-gray-200 pt-1.5 flex justify-between text-sm font-bold text-gray-900">
              <span>Total</span><span className="text-canteen-600">{formatPrice(total)}</span></div>
          </div></div>);
      }
      case 'qr_code': {
        const qrData = (message.metadata?.qrData as string) || '';
        return (<div className="space-y-2"><p className="text-sm font-medium text-chat-900">{message.content}</p>
          <div className="bg-white rounded-lg p-3 flex flex-col items-center gap-2">
            <div className="w-32 h-32 bg-white border-2 border-chat-200 rounded-lg flex items-center justify-center">
              <QrCode className="w-24 h-24 text-chat-800" /></div>
            <p className="text-xs text-gray-500 font-mono break-all">{qrData}</p>
            <p className="text-[10px] text-gray-400">Escaneie para pagar</p>
          </div></div>);
      }
      case 'status_update': {
        const status = (message.metadata?.status as string) || '';
        return (<div className="flex items-center gap-2"><span className="text-sm">{message.content}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-chat-100 text-chat-700">{STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status}</span></div>);
      }
      default: return <p className="text-sm whitespace-pre-line">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {isAttendant && isLastFromSender && <span className="text-[10px] text-green-600 font-medium ml-1 mb-0.5">Cantina</span>}
        <div className={`${bubbleBg} rounded-2xl px-3 py-2 shadow-sm ${isUser ? 'rounded-tr-md' : 'rounded-tl-md'}`}>{renderContent()}</div>
        <div className={`flex items-center gap-1 mt-0.5 px-1 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] text-gray-400">{new Date(message.created_at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</span>
          <StatusTicks message={message} />
        </div>
      </div>
    </div>
  );
}

interface ChatMessagesProps { messages: ChatMessage[]; isTyping: boolean; }

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);
  return (
    <div ref={scrollRef} className="chat-bg flex-1 overflow-y-auto scrollbar-thin px-3 py-3 space-y-2">
      {messages.map((msg, idx) => {
        const next = messages[idx + 1];
        const isLast = !next || next.sender !== msg.sender;
        return <ChatBubble key={msg.id} message={msg} isLastFromSender={isLast} />;
      })}
      {isTyping && (<div className="flex justify-start animate-fade-in"><div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
        </div></div></div>)}
    </div>
  );
}
