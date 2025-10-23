import mongoose, { Document, Schema } from 'mongoose';

export interface IKeuzeModule extends Document {
  name: string;
  shortdescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string;
  level: string;
  learningoutcomes: string;
  tags?: string[];
  translations?: {
    nl?: {
      name?: string;
      shortdescription?: string;
      description?: string;
      content?: string;
      learningoutcomes?: string;
    };
    en?: {
      name?: string;
      shortdescription?: string;
      description?: string;
      content?: string;
      learningoutcomes?: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema = new Schema({
  name: String,
  shortdescription: String,
  description: String,
  content: String,
  learningoutcomes: String,
}, { _id: false });

const KeuzeModuleSchema = new Schema<IKeuzeModule>({
  name: { type: String, required: true, trim: true },
  shortdescription: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  content: { type: String, default: '' },
  studycredit: { type: Number, default: 3, min: 0 },
  location: { type: String, required: true, trim: true },
  level: { type: String, default: 'Bachelor', trim: true },
  learningoutcomes: { type: String, default: '' },
  tags: { type: [String], default: [], index: true },
  translations: {
    nl: { type: TranslationSchema, default: {} },
    en: { type: TranslationSchema, default: {} },
  },
}, { timestamps: true });

// Indexes & text search for performant / robust queries
KeuzeModuleSchema.index({ name: 'text', shortdescription: 'text', description: 'text', 'translations.nl.name': 'text', 'translations.en.name': 'text' });
KeuzeModuleSchema.index({ tags: 1 });
KeuzeModuleSchema.index({ location: 1 });
KeuzeModuleSchema.index({ level: 1 });

const KeuzeModule = mongoose.model<IKeuzeModule>('KeuzeModule', KeuzeModuleSchema);
export default KeuzeModule;