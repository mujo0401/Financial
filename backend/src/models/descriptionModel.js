import mongoose from 'mongoose';

const descriptionSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Description = mongoose.model('Description', descriptionSchema);

export default Description;
