import type { Role } from '@/lib/types';
import { ShoppingBag, ChefHat, ArrowRight } from 'lucide-react';

interface RoleSelectProps { onSelect: (role: Role, name: string) => void; }

export function RoleSelect({ onSelect }: RoleSelectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-chat-600 via-chat-700 to-chat-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-5xl mx-auto mb-4 shadow-xl">🍔</div>
          <h1 className="text-3xl font-bold text-white tracking-tight">CantinaFlow</h1>
          <p className="text-chat-200 text-sm mt-1">Pedidos da cantina escolar pelo chat</p>
        </div>
        <div className="space-y-3">
          <button onClick={() => onSelect('customer', 'Aluno')}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-100 text-left group">
            <div className="w-14 h-14 rounded-2xl bg-canteen-100 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-7 h-7 text-canteen-600" /></div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base">Aluno / Cliente</h3>
              <p className="text-xs text-gray-500 mt-0.5">Faça pedidos pelo chat e acompanhe o status</p></div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-canteen-500 group-hover:translate-x-1 transition-all" />
          </button>
          <button onClick={() => onSelect('attendant', 'Cantina')}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-100 text-left group">
            <div className="w-14 h-14 rounded-2xl bg-chat-100 flex items-center justify-center shrink-0">
              <ChefHat className="w-7 h-7 text-chat-600" /></div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base">Atendente / Cantina</h3>
              <p className="text-xs text-gray-500 mt-0.5">Gerencie pedidos e envie avisos aos clientes</p></div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-chat-500 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
        <p className="text-center text-chat-300 text-xs mt-8">Selecione seu perfil para continuar</p>
      </div>
    </div>
  );
}
