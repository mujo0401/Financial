import xlsx from 'xlsx';
import Description from '../models/descriptionModel.js';
import Category from '../models/categoryModel.js';
import Transaction from '../models/transactionModel.js';

// Category keywords mapping
const categoryKeywords = {
  "Medical": ["MAYO CLINIC", "North Memorial", "Park Nicollet", "Amazon Pharmacy"],
  "Phone": ["ATT"],
  "Streaming Services": ["FULGAZ", "PRIME VIDEO", "YOUTUBEPREMIUM", "ESPN PLUS", "NETFLIX.COM", "NINTENDO", "Strava", "SLING.COM", "CHATGPT"],
  "Software Subscriptions": ["MICROSOFT 36", "GITHUB", "GODADDY.COM"],
  "Groceries": ["CUB FOODS", "LUNDS&BYERLYS", "WALMART"],
  "Internet": ["COMBAST CABLE"],
  "Vape Carts": ["3CHI.COM", "LOVE IS AN INGREDI", "MAINSTREAM"],
  "Magni&Sanders": ["FETCH", "PETCO"],
  "Laundry": ["BDS LAUNDRY"],
  "Vehicle": ["STATE FARM INSURANCE", "HOLIDAY STATIONS", "HONDA PMT"],
  "Rent": ["SAGE"],
  "Income": ["OLDREPUBLICTTLPAYROLL"],
  "Discover Payment": ["DISCOVERE-PAYMENT"],
  "Utilities": ["XCELENERGY"],
  "Gaming": ["STEAM", "BLIZZARD *"],
  "Fast Food": ["RAISING CANE'S"],
  "Online Shopping": ["AMAZON.COM*"]
};

const getCategoryFromDescription = (description) => {
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => description.includes(keyword))) {
            return category;
        }
    }
    return null; 
};

export const readXLSXFile = async (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 13 });
  
    for (let i = 1; i < data.length; i++) {
      const [transDate, , description, amount] = data[i];
      const categoryName = getCategoryFromDescription(description);
  
      if (categoryName) {
        let descriptionDoc = await findOrCreateDescription(description);
        let categoryDoc = await Category.findOne({ name: categoryName });
  
        if (!categoryDoc) {
          categoryDoc = new Category({ name: categoryName });
          await categoryDoc.save();
        }

        const parsedDate = parseDate(transDate); 
  
        const transaction = new Transaction({
          categoryId: categoryDoc._id,
          descriptionId: descriptionDoc._id,
          amount: parseFloat(amount),
          date: parsedDate
        });
  
        await transaction.save();
      }
  };

  // A helper function to parse the date (modify this as needed)
function parseDate(dateStr) {
  if (!dateStr) return new Date(); // Use current date if no date provided
  // Example for DD/MM/YYYY format (modify as per your format)
  const parts = dateStr.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

async function findOrCreateDescription(descriptionText) {
  let matchedKeyword = extractKeyword(descriptionText);
  let descriptionDoc = await Description.findOne({ name: matchedKeyword });

  if (!descriptionDoc) {
    descriptionDoc = new Description({ name: matchedKeyword });
    await descriptionDoc.save();
  }

  return descriptionDoc;
}

function extractKeyword(descriptionText) {
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      // Check if any keyword from the current category is in the description text
      const foundKeyword = keywords.find(keyword => descriptionText.includes(keyword));
      if (foundKeyword) {
        return foundKeyword; // Return the found keyword
      }
    }
    return null; // Return null if no keyword matches
  }}