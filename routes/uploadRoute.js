

import express from 'express';

const router = express.Router();

// Route to get dashboard data
router.get('/', async (req, res, next) => {
  console.log('Upload route hit');
    try {
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

export default router;
