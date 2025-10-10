import { userRepository } from '../../infrastructure/repositories/userRepository';
import { User } from '../../domain/models';

export async function loginUser(email: string, password: string): Promise<User> {
  const { user, token } = await userRepository.login(email, password);
  localStorage.setItem('token', token);
  return user;
}

export async function fetchProfile(): Promise<User> {
  return await userRepository.getProfile();
}
