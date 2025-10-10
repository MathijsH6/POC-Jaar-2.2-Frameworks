import api from '../api/axiosClient';
import { User } from '../../domain/models';

export const userRepository = {
  login: async (email: string, password: string) => {
    const resp = await api.post('/auth/login', { email, password });
    return resp.data as { user: User; token: string };
  },
  getProfile: async () => {
    const resp = await api.get('/users/me');
    return resp.data as User;
  },
};
