// fileSchema.js
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    importDate: { type: Date, default: Date.now },
    fileHash: { type: String, required: true, unique: true },
    mediaType: { type: String, required: true },
    encoding: { type: String, required: true },
    path: { type: String, required: true },
    isProcessed: { type: Boolean, default: false }
});

export default mongoose.model('File', fileSchema);
