import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  favorites?: Types.ObjectId[]; // verwijst naar KeuzeModule documenten
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: [{ type: Schema.Types.ObjectId, ref: 'KeuzeModule' }], default: [] },
}, { timestamps: true });

// named export (bestaat al), plus default export voor compatibiliteit
export const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;