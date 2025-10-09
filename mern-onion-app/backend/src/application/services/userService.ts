export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(userData: UserDTO): Promise<User> {
        const user = new User(userData);
        return await this.userRepository.addUser(user);
    }

    async findUser(userId: string): Promise<User | null> {
        return await this.userRepository.getUserById(userId);
    }

    // Additional methods for user operations can be added here
}