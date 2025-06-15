import mongoose from "mongoose";

const itemModifierSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  modifierId: { type: mongoose.Schema.Types.ObjectId, ref: "Modifier", required: true },
  extraPrice: { type: Number, default: 0 },
});

export default mongoose.model("ItemModifier", itemModifierSchema);
