import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fileRoute from './routes/fileRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';
import { parseExcelFile } from './financial-app/src/components/utils/fileParser.js';
import { getMonthlySpending } from './controllers/dashboardController.js';

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
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

app.get('/api', (_req, res) => {
  console.log('Home route hit');
  res.send('API is running');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Make sure this uploads directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.array('files', 10), async (req, res, next) => {
  console.log('upload route hit');
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  let data = [];
  let errors = [];

  for (const file of req.files) {
    try {
      if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
        const parsedData = await parseExcelFile(file.path);
        data.push({ file: file.originalname, content: parsedData });
      } else {
        errors.push(`The file ${file.originalname} is an unsupported file type.`);
      }
    } catch (error) {
      errors.push(`The file ${file.originalname} could not be processed: ${error.message}`);
    }
  }

  res.status(200).json({ data, errors });
});




app.use('/api/files', fileRoute);

app.use('/api/dashboard', dashboardRoute);

// Dashboard route
app.get('/api/dashboard', async (req, res, next) => {
  console.log('Dashboard route hit'); 
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    //const startOfYear = new Date(now.getFullYear(), 0, 1);
    //const endOfYear = new Date(now.getFullYear(), 11, 31);

    const reports = {
      monthlySpending: await getMonthlySpending(startOfMonth, endOfMonth),
      //annualSpending: await getAnnualSpending(startOfYear, endOfYear),
      //budgetComparison: await getBudgetComparison()
    };
    res.json(reports);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  res.status(statusCode).send({ error: message });
});

// Existing route for /api
app.get('/api', (_req, res) => {
  console.log('API route hit');
  res.send('API is running');
});

// Existing route for /api/dashboard
app.get('/api/dashboard', (_req, res) => {
  console.log('Dashboard route hit');
  res.send('API is running');
});

// Serve any static files
app.use(express.static(path.join(__dirname, 'C:\repo\Financial')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'C:\repo\Financial', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
