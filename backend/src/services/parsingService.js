import fs from 'fs';
import readXlsxFile from 'read-excel-file/node';
import Transaction from '../models/transactionModel.js';

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

function assignCategory(description) {
  if (typeof description === 'string' && description.trim() !== '') {
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => description.includes(keyword))) {
        return category;
      }
    }
  }
  return "Other"; // Default category if no keyword matches
}

export async function parseExcelFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return [];
  }

  const rows = await readXlsxFile(filePath);
  const transactionsData = rows.slice(1); // Skip the header row

  const transactionsToInsert = transactionsData.map(transactionRow => {
    const description = transactionRow[1]; // Adjust index based on where description is in your row
    const amount = parseFloat(transactionRow[2]); // Adjust index based on where amount is in your row
    const date = new Date(transactionRow[0]); // Adjust index based on where date is in your row

    return new Transaction({
      date,
      description,
      amount,
      category: assignCategory(description)
    });
  });

  try {
    await Transaction.insertMany(transactionsToInsert);
    console.log(`Successfully inserted ${transactionsToInsert.length} transactions.`);
    return transactionsToInsert;
  } catch (error) {
    console.error('Failed to insert transactions:', error);
    return [];
  }
}

export { assignCategory }