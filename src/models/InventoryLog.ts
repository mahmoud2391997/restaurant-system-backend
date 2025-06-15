import mongoose, { Schema, Document, Types } from "mongoose";

export interface IInventoryLog extends Document {
  itemId: Types.ObjectId;
  change: number;
  reason: "purchase_order" | "sale" | "adjustment" | "return";
  referenceId?: string;
  timestamp: Date;
}

const InventoryLogSchema = new Schema<IInventoryLog>({
  itemId: { type: Schema.Types.ObjectId, ref: "InventoryItem", required: true },
  change: { type: Number, required: true },
  reason: {
    type: String,
    enum: ["purchase_order", "sale", "adjustment", "return"],
    required: true,
  },
  referenceId: { type: Schema.Types.ObjectId, ref: "Employee" }, // <-- FIXED
  timestamp: { type: Date, default: Date.now },
});


export default mongoose.model<IInventoryLog>("InventoryLog", InventoryLogSchema);
