import mongoose from "mongoose";

const KitchenOrderItemSchema = new mongoose.Schema({
  menuItemId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  modifiers: { type: Map, of: String },
  specialInstructions: String,
  status: {
    type: String,
    enum: ["pending", "preparing", "ready", "served"],
    default: "pending",
  },
  estimatedTime: Number,
  actualTime: Number,
  startTime: Date,
  completionTime: Date,
  station: {
    type: String,
    enum: ["grill", "fryer", "salad", "dessert", "beverage", "main"],
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("KitchenOrderItem", KitchenOrderItemSchema);
