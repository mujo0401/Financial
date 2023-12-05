import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Category from './models/categoryModel'; 
import Description from './models/descriptionModel'; 

mongoose.connect('mongodb://localhost:27017/FinanceDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Load data from JSON files
const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf-8'));
const descriptionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'descriptions.json'), 'utf-8'));

const seedDB = async () => {
  // Clear existing data
  await Category.deleteMany({});
  await Description.deleteMany({});

  // Insert new data
  for (const category of categoriesData) {
    const newCategory = new Category(category);
    await newCategory.save();
  }

  for (const description of descriptionsData) {
    const newDescription = new Description(description);
    await newDescription.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
