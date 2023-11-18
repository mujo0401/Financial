const express = require('express');
const router = express.Router();
const descriptionController = require('../controllers/descriptionController');

// Create a new description
router.post('/', descriptionController.createDescription);

// Retrieve all descriptions
router.get('/', descriptionController.getAllDescriptions);

// Retrieve a single description by ID
router.get('/:id', descriptionController.getDescriptionById);

// Update a description
router.put('/:id', descriptionController.updateDescription);

// Delete a description
router.delete('/:id', descriptionController.deleteDescription);

module.exports = router;
