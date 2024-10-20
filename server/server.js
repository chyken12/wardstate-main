import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';



import AdmissionsRoutes from './Routes/AdmissionsRoutes.js';
import DischargesRoutes from './Routes/DischargesRoutes.js';
import ExpiredRoutes from './Routes/ExpiredRoutes.js';
import transInRoutes from './Routes/transInRoutes.js';
import transOutRoutes from './Routes/transOutRoutes.js';
import AuthRoutes from './Routes/AuthRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Updated CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// API routes
app.use('/api/admission', AdmissionsRoutes);
app.use('/api/discharges', DischargesRoutes);
app.use('/api/expired', ExpiredRoutes);
app.use('/api/transin', transInRoutes);
app.use('/api/transout', transOutRoutes);
app.use('/api/auth', AuthRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Set mongoose strictQuery option
mongoose.set('strictQuery', false); // or true

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log('Successfully connected to MongoDB');
   
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

  // Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});