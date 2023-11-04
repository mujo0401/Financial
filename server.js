
//server.js
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fileRoute from './routes/fileRoute.js'; // Ensure this path is correct
import { parseExcelFile } from './utils/fileParser.js';



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
  }
};

connectDB();

app.get('/api', (_req, res) => {
  res.send('API is running');
});

// Multer configuration for file storage
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

// TODO: Define Mongoose schemas and models (models.js)

// Handle file upload route
app.post('/api/upload', upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    // Process the file based on its mimetype
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
      data = await parseExcelFile(file.path);
    } else if (file.mimetype === 'application/pdf') {
      data = await parsePDFFile(file.path);
    } else {
      return res.status(400).send('Unsupported file type');
    }

    // TODO: Insert the data into MongoDB
    // For now, just send back the data as a response
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

app.use((error, req, res, next) => {
  console.error(error.stack); // Log the stack trace for debugging
  res.status(500).send('Something broke!');
});


/*app.post('/api/users/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ error: 'User with the given email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new user({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);mujo0401multererror: Unexpected field at wrappedFileFilter (C:\repo\Financial\node_modules\multer\index.js:40:19) at Multipart. (C:\repo\Financial\node_modules\multer\lib\make-middleware.js:107:7) at Multipart.emit (node:events:515:28) at HeaderParser.cb (C:\repo\Financial\node_modules\busboy\lib\types\multipart.js:358:14) at HeaderParser.push (C:\repo\Financial\node_modules\busboy\lib\types\multipart.js:162:20) at SBMH.ssCb [as _cb] (C:\repo\Financial\node_modules\busboy\lib\types\multipart.js:394:37) at feed (C:\repo\Financial\node_modules\streamsearch\lib\sbmh.js:219:14) at SBMH.push (C:\repo\Financial\node_modules\streamsearch\lib\sbmh.js:104:16) at Multipart._write (C:\repo\Financial\node_modules\busboy\lib\types\multipart.js:567:19) at writeOrBuffer (node:internal/streams/writable:556:12)GitHub CopilotThe error message "MulterError: Unexpected field" typically occurs when the field name specified in your multer middleware does not match the field name in your form data.In your server-side code, you might have something like this:In this case, multer is expecting a file in the 'file' field of the form data.If your client-side code is sending the file under a different field name, you will get the "Unexpected field" error. For example, if your client-side code looks like this:You will get the "Unexpected field" error because multer is expecting the field name to be 'file', but it's actually 'files'.To fix this issue, you need to make sure that the field name specified in your multer middleware matches the field name in your form data. So either change the server-side code to:Or change the client-side code to:This should resolve the "MulterError: Unexpected field" error.
    res.status(500).send({ error: 'Internal server error' });
  }
});*/

app.use('/api/', fileRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
