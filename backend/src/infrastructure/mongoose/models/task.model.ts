import { Schema, model, Types } from 'mongoose';

const TaskSchema = new Schema({
  projectId: { type: Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  done: { type: Boolean, default: false }
}, { timestamps: true });

export const TaskModel = model('Task', TaskSchema);
