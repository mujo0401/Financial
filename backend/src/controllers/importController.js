import Transaction from '../models/transactionModel.js';
import { readXLSXFile } from '../services/parsingService.js'; // Import the XLSX parsing logic

const importData = async (file) => {
    if (!file) {
        throw new Error('No file provided');
    }

    try {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Handle XLSX file
            await readXLSXFile(file.buffer);
        } else if (file.mimetype === 'application/json') {
            // Handle JSON file
            const records = JSON.parse(file.buffer.toString());
            for (const record of records) {
                const transaction = new Transaction(record);
                await transaction.save();
            }
        } else {
            throw new Error('Unsupported file type');
        }
        return 'File processed successfully';
    } catch (error) {
        throw new Error('Error processing file: ' + error.message);
    }
};

export { importData };