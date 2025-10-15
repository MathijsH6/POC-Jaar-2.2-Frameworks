import api from '../../infrastructure/api/axiosClient';

export type LocalizedFields = {
  name?: string;
  shortdescription?: string;
  description?: string;
  content?: string;
  learningoutcomes?: string;
};

export type KeuzeModule = {
  _id?: string;
  name: string;
  shortdescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string;
  level: string;
  learningoutcomes: string;
  tags?: string[];
  translations?: { nl?: LocalizedFields; en?: LocalizedFields };
  createdAt?: string;
  updatedAt?: string;
};

export async function listKeuzeModules(): Promise<KeuzeModule[]> {
  const res = await api.get('/keuzemodules');
  return res.data;
}

export async function getKeuzeModule(id: string): Promise<KeuzeModule> {
  const res = await api.get(`/keuzemodules/${id}`);
  return res.data;
}

export const getKeuzeModuleById = async (id: string) => {
  return await getKeuzeModule(id);
};

export async function toggleFavorite(moduleId: string): Promise<any[]> {
  const res = await api.post(`/keuzemodules/${moduleId}/favorite`);
  return res.data?.favorites || [];
}

export async function getFavoritesForCurrentUser(): Promise<KeuzeModule[]> {
  const res = await api.get('/keuzemodules/favorites/me');
  return res.data || [];
}

export async function getFavoritesFortUser(): Promise<KeuzeModule[]> {
  const res = await api.get('/keuzemodules/favorites/me');
  return res.data || [];
}