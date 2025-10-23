import KeuzeModuleModel from '../../infrastructure/persistence/mongoose/models/keuzemodule.model';
import UserModel from '../../infrastructure/persistence/mongoose/models/user.model';
import { Types } from 'mongoose';

export class KeuzeModuleService {
  async list() {
    return KeuzeModuleModel.find().lean();
  }

  async getById(id: string) {
    return KeuzeModuleModel.findById(id).lean();
  }

  async create(data: { title: string; description?: string; tags?: string[] }) {
    const doc = new KeuzeModuleModel(data);
    return doc.save();
  }

  // toggles favorite for userId; returns updated favorites array (populated)
  async toggleFavorite(userId: string, moduleId: string) {
    const uid = Types.ObjectId(userId);
    const mid = Types.ObjectId(moduleId);

    const user = await UserModel.findById(uid);
    if (!user) throw new Error('User not found');

    // zorg dat favorites altijd een array is (schema default + defensive)
    user.favorites = user.favorites ?? [];

    const idx = user.favorites.findIndex((f: any) => {
      // supports both ObjectId.equals and plain string comparison
      if (typeof f?.equals === 'function') return f.equals(mid);
      return String(f) === String(mid);
    });

    if (idx >= 0) {
      user.favorites.splice(idx, 1);
    } else {
      user.favorites.push(mid);
    }

    await user.save();
    await user.populate('favorites'); 
    return user.favorites;
  }

  async getFavoritesForUser(userId: string) {
    // populate then lean to get plain objects with populated favorites
    const user = await UserModel.findById(userId).populate('favorites').lean();
    return user?.favorites || [];
  }
}

export const keuzeModuleService = new KeuzeModuleService();