// models/MenuCategory.ts

import mongoose, { Schema, Document, Types } from "mongoose"

export interface IMenuCategory extends Document {
  _id: Types.ObjectId
  restaurant_id: string
  name: string
  description?: string
  display_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
  id: string // virtual
}

const MenuCategorySchema: Schema<IMenuCategory> = new Schema(
  {
    restaurant_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    display_order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id
      },
    },
  }
)

// Add virtual field `id` that returns string version of _id
MenuCategorySchema.virtual("id").get(function (this: IMenuCategory) {
  return this._id.toHexString()
})

export const MenuCategory = mongoose.model<IMenuCategory>("MenuCategory", MenuCategorySchema)
