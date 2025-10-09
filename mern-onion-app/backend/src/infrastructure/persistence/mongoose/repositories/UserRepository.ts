import { UserModel } from '../models/user.model';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { User } from '../../../domain/entities/User';

export class UserRepository implements IUserRepository {
    async addUser(userData: User): Promise<User> {
        const user = new UserModel(userData);
        await user.save();
        return user;
    }

    async getUserById(userId: string): Promise<User | null> {
        return UserModel.findById(userId).exec();
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
        return UserModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<User | null> {
        return UserModel.findByIdAndDelete(userId).exec();
    }

    async getAllUsers(): Promise<User[]> {
        return UserModel.find().exec();
    }
}