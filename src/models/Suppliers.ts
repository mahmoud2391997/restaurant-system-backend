import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISupplier extends Document {
  _id: Types.ObjectId;  // add this to fix unknown _id
  id: string;
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

const SupplierSchema: Schema<ISupplier> = new Schema(
  {
    restaurant_id: { type: String, required: true },
    name: { type: String, required: true },
    contact_person: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    payment_terms: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

SupplierSchema.virtual("id").get(function (this: ISupplier) {
  return this._id.toHexString();
});

SupplierSchema.set("toJSON", { virtuals: true });

export default mongoose.model<ISupplier>("Supplier", SupplierSchema);
