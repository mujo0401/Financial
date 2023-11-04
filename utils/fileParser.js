// In fileParser.js

import readXlsxFile from 'read-excel-file/node';
import Transaction from '../models/transactionModel.js'; // This should be your Mongoose model

export async function parseExcelFile(filePath) {
  const rows = await readXlsxFile(filePath);
  const transactions = rows.slice(12).map((row) => {
    // Process the row to fit your transaction schema
    // For example:
    const description = row[2]; // Assuming the Description is in column C
    const amount = row[3];      // Assuming the Amount is in column D
    const category = categorizeTransaction(description);

    return new Transaction({
      description,
      amount,
      category,
    });
  });

  // You can now save all transactions to the database
  for (const transaction of transactions) {
    await transaction.save();
  }

  // Return something meaningful, like a summary or the actual transactions
  return transactions;
}

// Helper function to categorize transactions
function categorizeTransaction(description) {
  // Implement your categorization logic here
}


