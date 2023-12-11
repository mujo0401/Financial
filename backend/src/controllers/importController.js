import Transaction from '../models/transactionModel.js';
import { readXLSXFile } from '../services/parsingService.js'; // Import the XLSX parsing logic

export const importData = async (file) => {
    if (!file) {
        throw new Error('No file uploaded.');
    }

    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Process XLSX file
        await readXLSXFile(file.buffer); // Pass the buffer to the parser
    } else if (file.mimetype === 'application/json') {
        // Process JSON file
        const records = JSON.parse(file.buffer.toString());
        for (const record of records) {
            const transaction = new Transaction({
                categoryId: record.categoryId,
                descriptionId: record.descriptionId, 
                amount: record.amount,
                date: new Date(record.date)
            });
            await transaction.save();
        }
    } else {
        throw new Error('Unsupported file type.');
    }

    return { message: 'Data imported successfully.' };
};