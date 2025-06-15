// models/Transaction.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  restaurant_id: string;
  order_id?: string;
  type: 'sale' | 'refund' | 'expense' | 'adjustment';
  amount: number;
  payment_method: string;
  description: string;
  category: string;
  createdBy: string;
  created_at: Date;
}

const TransactionSchema: Schema = new Schema({
  restaurant_id: { type: String, required: true },
  order_id: { type: String },
  type: { type: String, enum: ['sale', 'refund', 'expense', 'adjustment'], required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
