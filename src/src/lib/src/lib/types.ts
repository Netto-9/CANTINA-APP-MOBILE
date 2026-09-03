export interface MenuItem {
  id: string; name: string; description: string | null; price: number;
  category: string; emoji: string | null; available: boolean; created_at: string;
}
export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed';
export interface Order {
  id: string; customer_name: string; status: OrderStatus; total: number;
  payment_method: string | null; pickup_time: string | null; notes: string | null;
  created_at: string; updated_at: string;
}
export interface OrderItem {
  id: string; order_id: string; menu_item_id: string | null; name: string;
  quantity: number; unit_price: number; subtotal: number;
}
export interface OrderWithItems extends Order { order_items: OrderItem[]; }
export type MessageKind = 'text'|'menu'|'buttons'|'order_summary'|'qr_code'|'status_update';
export type MessageSender = 'user' | 'bot' | 'attendant';
export interface ChatMessage {
  id: string; conversation_id: string; sender: MessageSender;
  content: string | null; kind: MessageKind;
  metadata: Record<string, unknown> | null; order_id: string | null; created_at: string;
}
export interface CartItem { menuItem: MenuItem; quantity: number; }
export type PaymentMethod = 'pix' | 'credit' | 'prepaid';
export type PickupTime = 'Recreio das 10h' | 'Almoço 12h' | 'Recreio das 14h' | 'Saída 16h';
export type Role = 'customer' | 'attendant';
export type ConversationId = 'order' | 'support' | 'history';
export interface Conversation {
  id: ConversationId; name: string; avatar: string; description: string; icon: string;
}
