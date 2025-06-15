import mongoose from "mongoose";

const KitchenStationSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: { type: String, enum: ["grill", "fryer", "salad", "dessert", "beverage", "main"] },
  activeOrders: Number,
  averageTime: Number,
  status: { type: String, enum: ["active", "busy", "offline"] },
});

export default mongoose.model("KitchenStation", KitchenStationSchema);
