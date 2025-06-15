



// models/Employee.ts
import mongoose, { Schema, Document } from "mongoose";

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  shiftStart: string;
  shiftEnd: string;
  salary: number;
  joinDate: string;
  biometricId?: string;
  createdAt: Date;
  schedule: Schedule[];
}

const ScheduleSchema = new Schema<Schedule>({
  day: String,
  startTime: String,
  endTime: String,
});

const EmployeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  email: String,
  phone: String,
  shiftStart: String,
  shiftEnd: String,
  salary: Number,
  joinDate: String,
  biometricId: String,
  createdAt: { type: Date, default: Date.now },
  schedule: [ScheduleSchema],
});

export const EmployeeModel = mongoose.model<IEmployee>("Employee", EmployeeSchema);