import { Schema, model, Types } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  ownerId: { type: Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const ProjectModel = model('Project', ProjectSchema);
