import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

export default app;