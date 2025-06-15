import mongoose, { Schema, Document } from "mongoose";

export interface ISupplier extends Document {
  restaurant_id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  payment_terms: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const SupplierSchema: Schema = new Schema<ISupplier>(
  {
    restaurant_id: { type: String, required: true },
    name: { type: String, required: true },
    contact_person: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    payment_terms: { type: String },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ISupplier>("Supplier", SupplierSchema);
