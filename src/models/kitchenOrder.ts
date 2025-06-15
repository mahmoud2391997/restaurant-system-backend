import mongoose from "mongoose";

const KitchenOrderSchema = new mongoose.Schema({
  orderNumber: String,
  tableNumber: Number,
  customerName: String,
  orderType: {
    type: String,
    enum: ["dine-in", "delivery", "takeaway"],
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "KitchenOrderItem" }],
  priority: {
    type: String,
    enum: ["low", "normal", "high", "urgent"],
    default: "normal",
  },
  status: {
    type: String,
    enum: ["new", "acknowledged", "preparing", "ready", "served", "delayed"],
    default: "new",
  },
  orderTime: { type: Date, default: Date.now },
  estimatedCompletionTime: Date,
  actualCompletionTime: Date,
  totalEstimatedTime: Number,
  elapsedTime: Number,
  isRushed: Boolean,
  specialNotes: String,
  allergens: [String],
}, {
  timestamps: true,
});

export default mongoose.model("KitchenOrder", KitchenOrderSchema);
