import mongoose, { Schema,  } from "mongoose";

// types.ts (or keep your interface here)
export interface InventoryItem {
  id?: string; // optional because MongoDB generates _id
  name: string;
  unit: string;
  type: "raw" | "semi-finished";
  currentStock: number;
  minimumStock: number;
  costPerUnit: number;
  locked: boolean;
  category?: string;
  supplier?: string;
  lastUpdated?: string;
}


export interface IInventoryItemDocument extends InventoryItem, Document {}

const InventoryItemSchema = new Schema<IInventoryItemDocument>(
  {
    name: { type: String, required: true },
    unit: { type: String, required: true },
    type: { type: String, enum: ["raw", "semi-finished"], required: true },
    currentStock: { type: Number, required: true },
    minimumStock: { type: Number, required: true },
    costPerUnit: { type: Number, required: true },
    locked: { type: Boolean, default: false },
    category: { type: String },
    supplier: { type: String },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

InventoryItemSchema.virtual("id").get(function () {
  // now TS knows _id is ObjectId and you can convert to string
  return this._id.toHexString();
});

InventoryItemSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IInventoryItemDocument>(
  "InventoryItem",
  InventoryItemSchema
);

