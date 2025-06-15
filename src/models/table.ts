// models/Table.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITable extends Document {
  number: number;
  zone: string;
}

const TableSchema: Schema = new Schema({
  number: { type: Number, required: true },
  zone: { type: String, required: true },
});

export default mongoose.model<ITable>('Table', TableSchema);
