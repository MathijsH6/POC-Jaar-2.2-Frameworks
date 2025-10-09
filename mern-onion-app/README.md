# MERN Onion Architecture Project

This project is a MERN stack application that follows the Onion architecture pattern. It is structured to separate concerns and promote maintainability.

## Project Structure

```
mern-onion-app
├── backend
│   ├── src
│   │   ├── index.ts
│   │   ├── config
│   │   │   └── index.ts
│   │   ├── api
│   │   │   ├── controllers
│   │   │   │   └── userController.ts
│   │   │   └── routes
│   │   │       └── userRoutes.ts
│   │   ├── application
│   │   │   ├── services
│   │   │   │   └── userService.ts
│   │   │   └── dto
│   │   │       └── userDTO.ts
│   │   ├── domain
│   │   │   ├── entities
│   │   │   │   └── User.ts
│   │   │   └── interfaces
│   │   │       └── IUserRepository.ts
│   │   ├── infrastructure
│   │   │   ├── persistence
│   │   │   │   └── mongoose
│   │   │   │       ├── models
│   │   │   │       │   └── user.model.ts
│   │   │   │       └── repositories
│   │   │   │           └── UserRepository.ts
│   │   │   └── http
│   │   │       └── express.ts
│   │   └── shared
│   │       └── utils.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend
│   ├── src
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   ├── pages
│   │   │   └── Home.tsx
│   │   ├── components
│   │   │   └── Header.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── docker-compose.yml
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Docker (optional, for using docker-compose)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-onion-app
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Configuration

- Copy the `.env.example` files in both `backend` and `frontend` directories to `.env` and fill in the necessary environment variables.

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Docker Setup

If you prefer to use Docker, you can run the application using docker-compose:

```
docker-compose up
```

### Usage

- Access the frontend application at `http://localhost:3000`.
- The backend API will be available at `http://localhost:5000/api`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.