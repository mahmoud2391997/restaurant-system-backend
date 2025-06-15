// models/Recipe.ts

import mongoose, { Schema, Document, Types } from "mongoose"

// Ingredient Subdocument Interface
interface Ingredient {
  inventoryItemId: Types.ObjectId
  quantity: number
  unit: string
}

// Recipe Document Interface
export interface IRecipe extends Document {
  _id: Types.ObjectId
  name: string
  description?: string
  category: string
  ingredients: Ingredient[]
  id: string // virtual
}

// Ingredient Schema
const IngredientSchema = new Schema<Ingredient>(
  {
    inventoryItemId: { type: Schema.Types.ObjectId, ref: "InventoryItem", required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: false }
)

// Recipe Schema
const RecipeSchema = new Schema<IRecipe>(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    ingredients: { type: [IngredientSchema], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id
      },
    },
  }
)

// Virtual field to expose `id` instead of `_id`
RecipeSchema.virtual("id").get(function (this: IRecipe) {
  return this._id.toHexString()
})

export default mongoose.model<IRecipe>("Recipe", RecipeSchema)
