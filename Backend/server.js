import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import missionRoutes from './routes/missions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/missions', missionRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected successfully!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Please make sure you have updated the MONGO_URI in the .env file with your MongoDB Atlas credentials.');
  });

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
