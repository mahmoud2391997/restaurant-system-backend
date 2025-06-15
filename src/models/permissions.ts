import mongoose, { Schema, Document } from "mongoose";

export interface IPermission extends Document {
  roleId: mongoose.Types.ObjectId;
  moduleName: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

const PermissionSchema = new Schema<IPermission>({
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  moduleName: { type: String, required: true },
  canRead: { type: Boolean, default: false },
  canWrite: { type: Boolean, default: false },
  canDelete: { type: Boolean, default: false },
});

export const PermissionModel = mongoose.model<IPermission>("Permission", PermissionSchema);