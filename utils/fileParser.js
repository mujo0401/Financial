

// In fileParser.js
import fs from 'fs';
//import pdfParse from 'pdf-parse';
import readXlsxFile from 'read-excel-file/node';
import Transaction from '../models/transactionModel.js'; // This should be your Mongoose model



// Check if the file exists before trying to read it
/*if (fs.existsSync(filePath)) {
  // File exists, safe to proceed
  const data = fs.readFileSync(filePath);
  // rest of your code
} else {
  // File does not exist, handle accordingly
  console.log('File not found:', filePath);
}*/

// Category keywords mapping
const categoryKeywords = {
  "Medical": ["MAYO CLINIC", "North Memorial", "Park Nicollet", "Amazon Pharmacy"],
  "Phone": ["ATT"],
  "Streaming Services": ["FULGAZ", "PRIME VIDEO", "YOUTUBEPREMIUM", "ESPN PLUS", "NETFLIX.COM", "NINTENDO", "Strava", "SLING.COM", "CHATGPT"],
  "Software Subscriptions": ["MICROSOFT 36", "GITHUB"],
  "Groceries": ["CUB FOODS", "LUNDS&BYERLYS", "Walmart"],
  "Internet": ["COMBAST CABLE"],
  "Vape Carts": ["3CHI.COM", "LOVE IS AN INGREDI", "MAINSTREAM"],
  "Cat": ["FETCH"],
  "Laundry": ["BDS LAUNDRY"],
  "Vehicle": ["STATE FARM INSURANCE", "HOLIDAY STATIONS", "HONDA PMT"],
  "Rent": ["SAGE"],
  "Income": ["OLDREPUBLICTTLPAYROLL"],
  "Discover Payment": ["DISCOVERE-PAYMENT"],
  "Utilities": ["XCELENERGY"],
  "Gaming": ["STEAM"]
};

function normalizeAmount(deposit, withdrawal, amountWithoutSign) {
  let amount = 0;
  if (deposit) {
    amount = parseFloat(deposit.replace(/\$|\s|,/g, ''));
  } else if (withdrawal) {
    amount = parseFloat(withdrawal.replace(/\$|\s|,/g, '')) * -1; // Multiply by -1 to make it negative
  } else {
    amount = parseFloat(amountWithoutSign.replace(/,/g, ''));
  }
  return amount;
}

function processTransactions(transactions) {
  return transactions.map(transaction => {
    const [date, deposit, withdrawal, amountWithoutSign, description] = transaction;
    
    // Normalize the amount
    const amount = normalizeAmount(deposit, withdrawal, amountWithoutSign);

    // Categorize the transaction
    const category = categorizeTransaction(description);

    // Prepare the transaction data for MongoDB insertion
    return {
      date,
      amount,
      description: description.trim(),
      category
    };
  });
}

// Helper function to categorize transactions
function categorizeTransaction(description) {
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => description.toUpperCase().includes(keyword.toUpperCase()))) {
      return category;
    }
  }
  return 'Uncategorized';
}

export async function parseExcelFile(filePath) {
  const rows = await readXlsxFile(filePath);
  const transactions = rows.slice(12).map((row) => {
    const description = row[2]; // Assuming the Description is in column C
    const rawAmount = row[3]; // Assuming the Amount is in column D

    // Skip header or any non-numeric rows
    if (typeof rawAmount === 'string' && rawAmount.toUpperCase() === 'AMOUNT') {
      return null; // This is a header row or a non-numeric row, return null to filter it out later
    }
    
    const amount = parseFloat(rawAmount);
    
    // Validate the amount
    if (isNaN(amount)) {
      console.error(`Invalid amount '${rawAmount}' at row ${rows.indexOf(row) + 1}`);
      return null; // Return null for invalid transactions
    }
    const category = categorizeTransaction(description);

    return new Transaction({
      description,
      amount,
      category,
    });
  }).filter(transaction => transaction !== null); // Remove invalid transactions

  return transactions; // Return the valid transactions
}

// Function to parse PDF files
export async function parsePdfFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  const textContent = data.text;

  const rawTransactions = [...textContent.matchAll(transactionPattern)].map(match => ({
    date: match[1],
    deposit: match[2] || '',
    withdrawal: match[3] || '',
    amountWithoutSign: match[4] || '',
    description: match[5].trim()
  }));
  
  // Process and categorize the extracted transactions
  const categorizedTransactions = processTransactions(rawTransactions);
  
  // Save categorized transactions to the database
  for (const transaction of categorizedTransactions) {
    try {
      const dbTransaction = new Transaction(transaction);
      await dbTransaction.save(); // This line needs to be in an async function
    } catch (error) {
      console.error(`Error saving transaction: ${error}`);
    }
  }
  
  // Return something meaningful, like a summary or the actual categorized transactions
  return categorizedTransactions;
}
  
