import mongoose, { Document, Schema } from "mongoose";

export interface IMenuItem extends Document {
  branch_ids: mongoose.Types.ObjectId[]; // <-- updated
  category_id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  cost: number;
  prep_time: number;
  calories?: number;
  allergens: string[];
  dietary_tags: string[];
  is_available: boolean;
  is_featured: boolean;
  image_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    branch_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch", // Make sure "Branch" is the correct model name
        required: true,
      },
    ],
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    prep_time: { type: Number, required: true },
    calories: { type: Number },
    allergens: [{ type: String }],
    dietary_tags: [{ type: String }],
    is_available: { type: Boolean, required: true, default: true },
    is_featured: { type: Boolean, required: true, default: false },
    image_url: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
