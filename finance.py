from flask import Flask, render_template
import pandas as pd

finance = Flask(__name__)

@finance.route('/', methods=['GET'])
def index():
    return render_template('')


# Categories and associated keywords
category_keywords = {
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
}

# Function to categorize a transaction
def categorize_transaction(description, category_keywords):
    for category, keywords in category_keywords.items():
        for keyword in keywords:
            if keyword.lower() in description.lower():
                return category
    return "Other"

# Function to enter transactions
def enter_transactions():
    transactions = []
    while True:
        print("\nEnter the details of a transaction (or type 'done' to finish):")
        description = input("Description: ").strip()
        if description.lower() == 'done':
            break
        amount = input("Amount (positive for income, negative for expenses): ").strip()
        transaction_type = input("Type (Income/Expense): ").strip()
        try:
            amount = float(amount)
            if transaction_type.lower() not in ['income', 'expense']:
                print("Invalid type entered. Please enter 'Income' or 'Expense'.")
                continue
            transactions.append({'Description': description, 'Amount': amount, 'Type': transaction_type.capitalize()})
        except ValueError:
            print("Invalid amount entered. Please enter a number.")
            
    # Convert the list of transactions to a dataframe
    transactions_df = pd.DataFrame(transactions)
    return transactions_df

# Predefined transactions for demonstration
predefined_transactions = [
    {"Description": "MAYO CLINIC MEDICAL", "Amount": -150.0, "Type": "Expense"},
    # ... (other predefined transactions) ...
    {"Description": "Xcel Energy Utilities", "Amount": -80.0, "Type": "Expense"}
]

# Load the predefined transactions into a dataframe
predefined_transactions_df = pd.DataFrame(predefined_transactions)

# Apply categorization to the transactions
predefined_transactions_df['Category'] = predefined_transactions_df['Description'].apply(lambda x: categorize_transaction(x, category_keywords))

# Financial Analysis
total_expenses = predefined_transactions_df[predefined_transactions_df['Type'] == 'Expense']['Amount'].sum()
total_income = predefined_transactions_df[predefined_transactions_df['Type'] == 'Income']['Amount'].sum()
expenses_by_category = predefined_transactions_df[predefined_transactions_df['Type'] == 'Expense'].groupby('Category')['Amount'].sum().sort_values()
savings = total_income + total_expenses

# Display Results
print("\nTotal Expenses:", total_expenses)
print("Total Income:", total_income)
print("Savings:", savings)
print("\nExpenses by Category:")
print(expenses_by_category.abs())

def evaluate_savings(savings, total_income, expenses_by_category):
    advice = ""
    
    if savings > 0:
        advice += "You have a positive savings of ${:.2f}, which is excellent! ".format(savings)
        advice += "Consider building an emergency fund if you haven't already, and explore investment options to grow your wealth over time.\n"
        
        # Identify high expenses
        high_expenses = expenses_by_category[expenses_by_category > (total_income * 0.1)]  # Expenses more than 10% of income
        if not high_expenses.empty:
            advice += "You might want to review the following high expenses and see if there are opportunities to reduce them:\n"
            for category, amount in high_expenses.iteritems():
                advice += "- {}: ${:.2f}\n".format(category, amount)
    
    elif savings < 0:
        advice += "Your savings are negative, meaning your expenses are higher than your income. "
        advice += "It's crucial to review your expenses and identify areas where you can cut back. "
        advice += "Focus on non-essential categories first. You might also want to explore additional sources of income.\n"
        
    else:
        advice += "You have no savings for this period, meaning your expenses are equal to your income. "
        advice += "Start by building a small emergency fund and review your spending to ensure you are living within your means.\n"
        
    return advice

financial_advice = evaluate_savings(savings, total_income, expenses_by_category)
print(financial_advice)

if __name__ == ("__name__"):
    finance.run(debug=True)
