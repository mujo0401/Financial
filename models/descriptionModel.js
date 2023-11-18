import mongoose, { Schema } from 'mongoose';

const DescriptionSchema = new Schema({
    keyword: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, 
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Description = mongoose.model('Description', DescriptionSchema);

export { Description } ;

