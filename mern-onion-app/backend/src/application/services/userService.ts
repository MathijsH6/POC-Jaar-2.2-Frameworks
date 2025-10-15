import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../infrastructure/persistence/mongoose/models/user.model';
import { config } from '../../config';

export class UserService {
    async register(data: { name: string; email: string; password: string }) {
        const exists = await UserModel.findOne({ email: data.email }).exec();
        if (exists) throw new Error('Email already in use');
        const hashed = await bcrypt.hash(data.password, 10);
        const user = new UserModel({ name: data.name, email: data.email, password: hashed });
        await user.save();
        const obj = user.toObject();
        delete (obj as any).password;
        return obj;
    }

    async login({ email, password }: { email: string; password: string }) {
        const userDoc = await UserModel.findOne({ email }).exec();
        if (!userDoc) throw new Error('Invalid credentials');

        const ok = await bcrypt.compare(password, userDoc.password);
        if (!ok) throw new Error('Invalid credentials');

        const payload = { id: userDoc._id.toString() };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });

        const user = { id: userDoc._id.toString(), name: userDoc.name, email: userDoc.email };

        return { user, token };
    }

    async getAll() {
        return UserModel.find().select('-password').lean().exec();
    }

    async getById(id: string) {
        return UserModel.findById(id).select('-password').lean().exec();
    }

    async update(id: string, data: Partial<any>) {
        if ((data as any).password) {
            (data as any).password = await bcrypt.hash((data as any).password, 10);
        }
        return UserModel.findByIdAndUpdate(id, data, { new: true }).select('-password').lean().exec();
    }

    async delete(id: string) {
        return UserModel.findByIdAndDelete(id).lean().exec();
    }
}

export const userService = new UserService();