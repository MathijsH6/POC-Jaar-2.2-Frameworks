import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000,
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mern-onion-app',
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};