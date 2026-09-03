import type { Conversation, PickupTime, PaymentMethod, OrderStatus } from './types';

export const CONVERSATIONS: Conversation[] = [
  { id:'order', name:'Realizar Pedido', avatar:'🛒', description:'Faça seu pedido pelo chat', icon:'ShoppingBag' },
  { id:'support', name:'Suporte / Dúvidas', avatar:'💬', description:'Tire suas dúvidas com a cantina', icon:'HelpCircle' },
  { id:'history', name:'Histórico de Pedidos', avatar:'📋', description:'Veja seus pedidos anteriores', icon:'ClipboardList' },
];
export const PICKUP_TIMES: PickupTime[] = ['Recreio das 10h','Almoço 12h','Recreio das 14h','Saída 16h'];
export const PAYMENT_METHODS: { id:PaymentMethod; label:string; emoji:string }[] = [
  { id:'pix', label:'Pix', emoji:'⚡' },
  { id:'credit', label:'Cartão de Crédito', emoji:'💳' },
  { id:'prepaid', label:'Saldo Pré-pago', emoji:'👛' },
];
export const STATUS_LABELS: Record<OrderStatus,string> = {
  received:'Recebido', preparing:'Em preparação', ready:'Pronto para retirada', completed:'Concluído',
};
export const STATUS_EMOJI: Record<OrderStatus,string> = { received:'✓', preparing:'👨‍🍳', ready:'✅', completed:'🎉' };
export const STATUS_COLORS: Record<OrderStatus,string> = { received:'text-blue-400', preparing:'text-amber-400', ready:'text-green-400', completed:'text-gray-400' };
export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
}
