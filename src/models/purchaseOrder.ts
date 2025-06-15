import mongoose, { Schema, Document, Types } from "mongoose"

export interface IPurchaseOrderItem {
  item_id: Types.ObjectId
  item_name: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface IPurchaseOrder extends Document {
  supplierId: Types.ObjectId
  supplier_name: string
  orderDate: Date
  status: 'pending' | 'received' | 'cancelled'
  createdBy: Types.ObjectId
  items: IPurchaseOrderItem[]
  total_amount: number
  updated_at: Date
  created_at: Date
}

const PurchaseOrderItemSchema = new Schema<IPurchaseOrderItem>(
  {
    item_id: { type: Schema.Types.ObjectId, required: true, ref: 'InventoryItem' },
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0.1 },
    unit_price: { type: Number, required: true, min: 0.01 },
    total_price: { type: Number, required: true, min: 0.01 },
  },
  { _id: false }
)

const PurchaseOrderSchema = new Schema<IPurchaseOrder>(
  {
    supplierId: { type: Schema.Types.ObjectId, required: true, ref: 'Supplier' },
    supplier_name: { type: String, required: true },
    orderDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'received', 'cancelled'],
      default: 'pending',
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
    items: { type: [PurchaseOrderItemSchema], required: true },
    total_amount: { type: Number, required: true, min: 0.01 },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export const PurchaseOrder = mongoose.model<IPurchaseOrder>(
  "PurchaseOrder",
  PurchaseOrderSchema
)
