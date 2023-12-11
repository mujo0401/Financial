import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    originalName: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now },
    path: { type: String, required: true },
    isProcessed: { type: Boolean, default: false }
});

export default mongoose.model('File', fileSchema);
