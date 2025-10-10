import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { UserDTO } from '../dto/userDTO';
import { User } from '../../domain/entities/User';

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(userData: UserDTO): Promise<any> {
        const user = new User(userData.id ?? '', userData.name, userData.email);
        return await this.userRepository.addUser(user);
    }

    async findUser(userId: string): Promise<any> {
        return await this.userRepository.getUserById(userId);
    }

    async updateUser(userId: string, userData: Partial<UserDTO>): Promise<any> {
        return await this.userRepository.updateUser(userId, userData);
    }
}