// models/Reservation.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  tableId: string;
  partySize: number;
  reservationDate: Date;
  reservationTime: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no-show';
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String },
  tableId: { type: String, required: true },
  partySize: { type: Number, required: true },
  reservationDate: { type: Date, required: true },
  reservationTime: { type: String, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'seated', 'completed', 'cancelled', 'no-show'],
    required: true,
  },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
