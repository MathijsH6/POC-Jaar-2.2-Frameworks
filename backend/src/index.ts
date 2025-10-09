import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('LU2 POC backend running'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
