export interface IUserRepository {
    addUser(user: any): Promise<any>;
    getUserById(id: string): Promise<any>;
    updateUser(id: string, user: any): Promise<any>;
    deleteUser(id: string): Promise<any>;
    getAllUsers(): Promise<any[]>;
}