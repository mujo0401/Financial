import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, 
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

export { Category } ;

