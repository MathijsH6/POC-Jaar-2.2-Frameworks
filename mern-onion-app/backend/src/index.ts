import express from 'express';
import mongoose from 'mongoose';
import { userRoutes } from './api/routes/userRoutes';
import { config } from './config';

const app = express();
const PORT = config.port || 5000;

app.use(express.json());
app.use('/api/users', userRoutes());

mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });