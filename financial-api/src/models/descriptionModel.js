import mongoose, { Schema } from 'mongoose';

const DescriptionSchema = new Schema({
    descriptionName: { type: String, required: true },
    CategoryId: { type: Schema.Types.ObjectId, ref: 'Category' }, 
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Description = mongoose.model('Description', DescriptionSchema);

export default Description ;