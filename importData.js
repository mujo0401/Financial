// fileParser.js
import readXlsxFile from 'read-excel-file/node';
import Transaction from './models/transactionModel.js'; // Adjust the import path as needed

export async function parseExcelFile(filePath) {
  const rows = await readXlsxFile(filePath);
  const transactions = rows.slice(12).map((row) => {
    // Process the row to fit your transaction schema
    const description = row[2]; // Assuming Description is in column C
    const amount = row[3];      // Assuming Amount is in column D
    const category = categorizeTransaction(description);

    // Create a transaction instance (don't save yet)
    return new Transaction({
      description,
      amount,
      category,
    });
  });

  // Save all transactions to the database
  await Transaction.insertMany(transactions.map(t => t.toObject()));

  // Return the processed transactions
  return transactions;
}

// Helper function to categorize transactions
function categorizeTransaction(description) {
  // Implement your categorization logic here
  // ...
}
WS