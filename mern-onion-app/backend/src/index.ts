import mongoose from 'mongoose';
import userRoutes from './api/routes/userRoutes';
import { config } from './config';
import app from './infrastructure/http/express';
import keuzeModuleRoutes from './api/routes/keuzeModuleRoutes';

const PORT = process.env.PORT || config.port || 5000;

app.use('/api', userRoutes);
app.use('/api/keuzemodules', keuzeModuleRoutes);

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server is running on  ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });