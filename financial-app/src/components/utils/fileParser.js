import fs from 'fs';
import readXlsxFile from 'read-excel-file/node';
import Transaction  from '../../../../models/transactionModel.js';
import { Category }  from '../../../../models/categoryModel.js';
import { Description }  from '../../../../models/descriptionModel.js';

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

// Function to assign a category based on description
function assignCategory(description) {
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => description.includes(keyword))) {
      return category;
    }
  }
  return "Other"; // Default category if no keyword matches
}

// Function to get or create a category and return its ID
async function getCategoryId(categoryName) {
  let categoryDocument = await Category.findOne({ categoryName });
  if (!categoryDocument) {
    categoryDocument = new Category({ categoryName });
    await categoryDocument.save();
  }
  return categoryDocument._id;
}

// Function to process transactions and summarize data
async function processTransactions(transactions) {
  const summary = {};

  for (const transaction of transactions) {
    const category = await getCategoryId(assignCategory(transaction[2])); // Assuming description is in the 3rd column
    if (!summary[category]) {
      summary[category] = { Amount: 0, LatestDate: new Date(0) };
    }
    const amount = parseFloat(transaction[3]); // Assuming amount is in the 4th column
    summary[category].Amount += isNaN(amount) ? 0 : amount;

    const transDate = new Date(transaction[1]); // Assuming date is in the 2nd column
    if (transDate > summary[category].LatestDate) {
      summary[category].LatestDate = transDate;
    }
  }

  return summary;
}

// Main function to parse Excel file and insert transactions
export async function parseExcelFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return [];
  }

  const rows = await readXlsxFile(filePath);
  const rawDataArray = rows.slice(12); // Skip the first 12 rows

  const transactionsSummary = processTransactions(rawDataArray);
  const transactionsToInsert = Object.entries(transactionsSummary).map(([category, data]) => {
    const descriptions = categoryDescriptionsMap.get(category) || [];
    // You can choose the first description, a random one, or any other logic
    const description = descriptions.length > 0 ? descriptions[0] : `No description for ${category}`;

    return {
        description: description,
        amount: data.Amount,
        category: category,
        date: data.LatestDate
    };
});

  if (transactionsToInsert.length > 0) {
    try {
      // Bulk insert the summarized transactions
      const insertedTransactions = await Transaction.insertMany(transactionsToInsert);
      console.log(`Successfully inserted ${insertedTransactions.length} transactions.`);
      return insertedTransactions;
    } catch (error) {
      console.error('Failed to insert transactions:', error);
      return [];
    }
  } else {
    console.error('No valid transactions to insert');
    return [];
  }
}

export { assignCategory }

