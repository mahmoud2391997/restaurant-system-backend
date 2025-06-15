import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStockAdjustment extends Document {
  _id: Types.ObjectId;
  itemId: Types.ObjectId;
  adjustmentType: "manual" | "physical_count" | "variance";
  change: "increment" | "decrement"
  quantity: number;
  createdAt: Date;
  createdBy: Types.ObjectId;
  notes?: string;
}

const StockAdjustmentSchema = new Schema<IStockAdjustment>(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "InventoryItem", required: true },
    adjustmentType: {
      type: String,
      enum: ["manual", "physical_count", "variance"],
      required: true,
    },
    change: {
      type: String,
      enum: ["increment",  "decrement"],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    quantity: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

StockAdjustmentSchema.virtual("id").get(function (this: IStockAdjustment) {
  return this._id.toHexString();
});

StockAdjustmentSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IStockAdjustment>("StockAdjustment", StockAdjustmentSchema);
