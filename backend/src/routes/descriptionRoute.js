// routes.js or wherever you define your routes

import express from 'express';
import descriptionController from '../controllers/descriptionController.js';

const router = express.Router();

router.get('/', descriptionController.getDescriptions);

export default router;
