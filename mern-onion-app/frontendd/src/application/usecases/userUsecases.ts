import api from '../../infrastructure/api/axiosClient';
import { User } from '../../domain/models';

export async function loginUser(email: string, password: string): Promise<{ user: User; token?: string }> {
  const resp = await api.post('/login', { email, password });
  const data = resp.data;

  // try extract token from body
  let token: string | undefined = undefined;
  if (data && typeof data === 'object') {
    if ('token' in data && typeof (data as any).token === 'string') token = (data as any).token;
    else if ('accessToken' in data && typeof (data as any).accessToken === 'string') token = (data as any).accessToken;
    else if ('jwt' in data && typeof (data as any).jwt === 'string') token = (data as any).jwt;
  }

  // try extract token from headers if not found in body
  if (!token) {
    const hdr = resp.headers?.authorization || resp.headers?.Authorization || resp.headers?.['x-access-token'] || resp.headers?.['x-access-token'];
    if (typeof hdr === 'string') {
      token = hdr.startsWith('Bearer ') ? hdr.slice(7) : hdr;
    }
  }

  // determine user object
  let user: User;
  if (data && typeof data === 'object' && 'user' in data) {
    user = (data as any).user as User;
  } else {
    // if response body contains token + user fields, remove token fields if present
    // assume remaining object is user-like
    user = data as User;
  }

  return { user, token };
}

export async function registerUser(payload: { name: string; email: string; password: string; }): Promise<{ user: User; token?: string }> {
  const endpoints = ['/users/register', '/register', '/users'];
  let lastErr: any = null;

  for (const ep of endpoints) {
    try {
      const resp = await api.post(ep, payload);
      const data = resp.data;

      // extract token from body
      let token: string | undefined = undefined;
      if (data && typeof data === 'object') {
        if ('token' in data && typeof (data as any).token === 'string') token = (data as any).token;
        else if ('accessToken' in data && typeof (data as any).accessToken === 'string') token = (data as any).accessToken;
        else if ('jwt' in data && typeof (data as any).jwt === 'string') token = (data as any).jwt;
      }

      // extract token from headers
      if (!token) {
        const hdr = resp.headers?.authorization || resp.headers?.Authorization || resp.headers?.['x-access-token'];
        if (typeof hdr === 'string') token = hdr.startsWith('Bearer ') ? hdr.slice(7) : hdr;
      }

      // determine user object if returned
      let user: User | undefined;
      if (data && typeof data === 'object' && 'user' in data) user = (data as any).user as User;
      else if (data && typeof data === 'object' && (data.email || data.name || data._id || (data as any).id)) user = data as User;

      // If backend did not return user/token, try to login immediately
      if (!user && !token) {
        return await loginUser(payload.email, payload.password);
      }

      // If token exists but user missing, try fetch profile
      if (!user && token) {
        try {
          const prev = api.defaults.headers.common['Authorization'];
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const profileResp = await api.get('/users/me');
          if (prev) api.defaults.headers.common['Authorization'] = prev;
          else delete api.defaults.headers.common['Authorization'];
          user = profileResp.data as User;
        } catch (e) {
          // ignore profile fetch error
        }
      }

      // final fallback: coerce data to user if possible
      if (!user && data && typeof data === 'object') user = (data as any).user ?? (data as any);

      return { user: user as User, token };
    } catch (err: any) {
      lastErr = err;
      // try next endpoint if 404, otherwise rethrow
      if (err?.response?.status === 404) continue;
      throw err;
    }
  }

  throw lastErr ?? new Error('Registration failed');
}

export async function getProfile(): Promise<User> {
  const resp = await api.get('/users/me');
  return resp.data as User;
}
