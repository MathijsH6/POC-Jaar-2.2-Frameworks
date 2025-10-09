export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userDTO = req.body;
            const newUser = await this.userService.registerUser(userDTO);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const user = await this.userService.findUser(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const userDTO = req.body;
            const updatedUser = await this.userService.updateUser(userId, userDTO);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}