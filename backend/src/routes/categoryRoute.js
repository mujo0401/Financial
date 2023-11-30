// routes.js or wherever you define your routes

import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', categoryController.getCategories);

export default router;
