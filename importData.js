// fileParser.js
import readXlsxFile from 'read-excel-file/node';
import Transaction from './models/transactionModel.js'; // Adjust the import path as needed

export async function parseExcelFile(filePath) {
  const rows = await readXlsxFile(filePath);
  const transactions = rows.slice(12).map((row) => {
    // Process the row to fit your transaction schema
    const description = row[2]; // Assuming Description is in column C
    
const rawAmount = row[3]; // Raw value from the Excel file, column D
const amount = parseFloat(rawAmount); // Attempt to convert to a float

if (isNaN(amount)) {
  // Check if the conversion was successful
  console.error(`Error: Invalid amount for transaction with description: ${description}`);
  return null;
}

// If the amount is valid, proceed with creating the transaction object
const category = categorizeTransaction(description);

// Create a transaction instance (don't save yet)
return new Transaction({
  description,
  amount,
  category,
  date: new Date(), // Sets to current date and time
});
});

// Save all transactions to the database
await Transaction.insertMany(transactions);

// Return the processed transactions
return transactions;
}

// Helper function to categorize transactions
function categorizeTransaction(description) {
// Implement your categorization logic here
// ...
}proceed