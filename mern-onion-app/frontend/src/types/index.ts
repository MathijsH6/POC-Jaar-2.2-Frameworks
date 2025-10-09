export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserDTO = {
  name: string;
  email: string;
};

export interface IUserService {
  registerUser(userDTO: UserDTO): Promise<User>;
  findUser(id: string): Promise<User | null>;
}

export interface IUserRepository {
  addUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User | null>;
}