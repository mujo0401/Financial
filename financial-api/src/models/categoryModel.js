import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;