import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
import morgan from 'morgan';
import transactionRoute from './routes/transactionRoute.js';
import categoryRoute from './routes/categoryRoute.js'; 
import descriptionRoute from './routes/descriptionRoute.js'; 
import fileRoute from './routes/fileRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import healthRoute from './routes/healthRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';

const app = express();

app.use(cors({
  origin: `*`
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use(express.static(path.join(__dirname, 'public'))); 

// Multer upload setup
const upload = multer({ storage: storage });


// API routes
app.use('/api/files', fileRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/upload', upload.array('files', 10), uploadRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/descriptions', descriptionRoute);
app.use('/api/health', healthRoute);
app.use('/api/dashboard', dashboardRoute);

// In your Express server setup:
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// React app routing for frontend
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); 
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;