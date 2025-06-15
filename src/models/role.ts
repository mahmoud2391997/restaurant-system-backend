// models/Role.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true },
});

export const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
