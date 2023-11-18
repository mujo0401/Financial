const Description = require('../models/Description');

// Create a new description
exports.createDescription = async (req, res) => {
    try {
        const newDescription = new Description({
            keyword: req.body.keyword,
            category: req.body.category,
            // add other fields as needed
        });
        const savedDescription = await newDescription.save();
        res.status(201).json(savedDescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all descriptions
exports.getAllDescriptions = async (req, res) => {
    try {
        const descriptions = await Description.find();
        res.json(descriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a single description by ID
exports.getDescriptionById = async (req, res) => {
    try {
        const description = await Description.findById(req.params.id);
        if (description) {
            res.json(description);
        } else {
            res.status(404).json({ message: 'Description not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a description
exports.updateDescription = async (req, res) => {
    try {
        const updatedDescription = await Description.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedDescription) {
            res.json(updatedDescription);
        } else {
            res.status(404).json({ message: 'Description not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a description
exports.deleteDescription = async (req, res) => {
    try {
        const deletedDescription = await Description.findByIdAndDelete(req.params.id);
        if (deletedDescription) {
            res.json({ message: 'Description deleted' });
        } else {
            res.status(404).json({ message: 'Description not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
