import mongoose from "mongoose";

const modifierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["single", "multiple"], required: true },
  options: [
    {
      name: { type: String, required: true },
      extraPrice: { type: Number, default: 0 },
    },
  ],
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
});

export default mongoose.model("Modifier", modifierSchema);
