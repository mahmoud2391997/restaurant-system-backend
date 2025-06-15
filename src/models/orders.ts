// models/Order.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItemModifier extends Document {
  modifier_option_id: string;
  quantity: number;
  unit_price: number;
}

export interface IOrderItem extends Document {
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  special_instructions?: string;
  modifiers: IOrderItemModifier[];
}

export interface IOrder extends Document {
  restaurant_id: string;
  customer_id?: string;
  order_number: string;
  order_type: 'dine_in' | 'takeout' | 'delivery' | 'online';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  table_number?: string;
  subtotal: number;
  tax_amount: number;
  tip_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method: 'cash' | 'card' | 'online';
  special_instructions?: string;
  estimated_ready_time?: Date;
  created_at: Date;
  updated_at: Date;
  items: IOrderItem[];
}

const OrderItemModifierSchema: Schema = new Schema({
  modifier_option_id: String,
  quantity: Number,
  unit_price: Number,
}, { _id: false });

const OrderItemSchema: Schema = new Schema({
  menu_item_id: String,
  quantity: Number,
  unit_price: Number,
  total_price: Number,
  special_instructions: String,
  modifiers: [OrderItemModifierSchema],
}, { _id: false });

const OrderSchema: Schema = new Schema({
  restaurant_id: String,
  customer_id: String,
  order_number: String,
  order_type: { type: String, enum: ['dine_in', 'takeout', 'delivery', 'online'] },
  status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'] },
  table_number: String,
  subtotal: Number,
  tax_amount: Number,
  tip_amount: Number,
  discount_amount: Number,
  total_amount: Number,
  payment_status: { type: String, enum: ['pending', 'paid', 'refunded'] },
  payment_method: { type: String, enum: ['cash', 'card', 'online'] },
  special_instructions: String,
  estimated_ready_time: Date,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  items: [OrderItemSchema],
});

export default mongoose.model<IOrder>('Order', OrderSchema);
