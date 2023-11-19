import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fileRoute from './routes/fileRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import descriptionRoute from './routes/descriptionRoute.js';
import transactionRoute from './routes/transactionRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FinanceDB';

const connectDB = async () => {
  try {
    console.log('Connecting to FinanceDB...');
    await mongoose.connect(MONGODB_URI, { dbName: 'FinanceDB' });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`Could not connect to MongoDB: ${err}`);
    process.exit(1);
  }
};

connectDB();

// Middleware for error handling
app.use((error, req, res, next) => {
  console.error(error.stack);
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  res.status(statusCode).send({ error: message });
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serving
app.use(express.static(path.join(__dirname, 'financial-app', 'public')));

// Route definitions
app.use('/api/files', fileRoute);
app.use('/transactionEntry', transactionRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/descriptions', descriptionRoute);
app.use('/api/dashboard', dashboardRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// React app routing for frontend
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'financial-app', 'public', 'index.html'));
});

// Multer upload setup
const upload = multer({ storage: storage });

app.use('/api/upload', upload.array('files', 10), uploadRoute);
