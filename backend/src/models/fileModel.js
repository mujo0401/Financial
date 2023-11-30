import mongoose from 'mongoose';

// Schema for file metadata
const fileSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now }
});

// Create FileModel
const File = mongoose.model('File', fileSchema);

// Schema for extracted data
const dataSchema = new mongoose.Schema({
  key: String,
  value: mongoose.Schema.Types.Mixed,
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File' }
});

// Create DataModel
const DataModel = mongoose.model('Data', dataSchema);

// Export the mongoose models as named exports
export { File, DataModel };