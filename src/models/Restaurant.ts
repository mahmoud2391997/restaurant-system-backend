import mongoose, { Document, Schema } from "mongoose";

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  is_closed: boolean;
}

export interface IRestaurant extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  cuisine_type: string;
  operating_hours: OperatingHours;
  tax_rate: number;
  currency: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

const DayHoursSchema = new Schema<DayHours>({
  open: { type: String, required: true },
  close: { type: String, required: true },
  is_closed: { type: Boolean, required: true },
});

const OperatingHoursSchema = new Schema<OperatingHours>({
  monday: { type: DayHoursSchema, required: true },
  tuesday: { type: DayHoursSchema, required: true },
  wednesday: { type: DayHoursSchema, required: true },
  thursday: { type: DayHoursSchema, required: true },
  friday: { type: DayHoursSchema, required: true },
  saturday: { type: DayHoursSchema, required: true },
  sunday: { type: DayHoursSchema, required: true },
});

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    cuisine_type: { type: String, required: true },
    operating_hours: { type: OperatingHoursSchema, required: true },
    tax_rate: { type: Number, required: true },
    currency: { type: String, required: true },
    timezone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
