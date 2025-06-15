import mongoose, { Schema, Document, Types } from "mongoose"

export interface IStockMovement extends Document {
  inventory_item_id: mongoose.Types.ObjectId
  quantity: number
  movement_type: 'in' | 'out' | 'transfer' | 'waste' | 'production'
  reference_type?: string
  reference_id?: string
  notes?: string
  location_from?: string
  location_to?: string
    createdBy: Types.ObjectId;
  
  createdAt: Date
  updatedAt: Date
}

const StockMovementSchema = new Schema<IStockMovement>(
  {
    inventory_item_id: {
      type: Schema.Types.ObjectId,
      ref: "InventoryItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    movement_type: {
      type: String,
      enum: ['in', 'out', 'transfer', 'waste', 'production'],
      required: true,
    },
    reference_type: String,
    reference_id: String,
    notes: String,
    location_from: String,
    location_to: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
StockMovementSchema.virtual("id").get(function (this: any) {
  return this._id.toHexString();
});


export default mongoose.model<IStockMovement>("StockMovement", StockMovementSchema)
