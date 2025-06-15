import mongoose, { Schema, Document } from 'mongoose'

export interface BranchDocument extends Document {
  name: string
  address: string
  phone: string
  email: string
  managerId: string
  isActive: boolean
  openingTime: string
  closingTime: string
  timezone: string
  createdAt: Date
  updatedAt: Date
}

const BranchSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    managerId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    timezone: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<BranchDocument>('Branch', BranchSchema)
