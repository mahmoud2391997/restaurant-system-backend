// models/UserRole.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUserRole extends Document {
  employeeId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
}

const UserRoleSchema = new Schema<IUserRole>({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
});

export const UserRoleModel = mongoose.model<IUserRole>("UserRole", UserRoleSchema);