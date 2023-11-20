import description from '../models/descriptionModel.js';

// Create a new description
export const createDescription = async (req, res) => {
    try {
        const newDescription = new description({
            DescriptionId: req.body.DescriptionId,
            DescriptionName: req.body.DescriptionName,
            isActive: req.body.isActive
        });
        const savedDescription = await newDescription.save();
        res.status(201).json(savedDescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all descriptions
export const getAllDescriptions = async (req, res) => {
    try {
        const descriptions = await description.find();
        res.json(descriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a single description by ID
export const getDescriptionById = async (req, res) => {
    try {
        const description = await description.findById(req.params.id);
        if (description) {
            res.json(description);
        } else {
            res.status(404).json({ message: 'description not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a description
export const updateDescription = async (req, res) => {
    try {
        const updatedDescription = await description.findByIdAndUpdate(
            req.params.id,
            { DescriptionName: req.body.DescriptionName, isActive: req.body.isActive },
            { new: true }  // to return the updated document
        );
        if (updatedDescription) {
            res.json(updatedDescription);
        } else {
            res.status(404).json({ message: 'description not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a description
export const deleteDescription = async (req, res) => {
    try {
        const deletedDescription = await description.findByIdAndDelete(req.params.id);
        if (deletedDescription) {
            res.json({ message: 'description deleted' });
        } else {
            res.status(404).json({ message: 'description not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search descriptions by name
export const searchDescriptionsByName = async (req, res) => {
    try {
        const searchName = req.query.name;
        const descriptions = await description.find({ DescriptionName: { $regex: searchName, $options: 'i' } });
        res.json(descriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
