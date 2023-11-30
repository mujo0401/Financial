import React, { useState, useEffect } from 'react';
import { Label, Input, Button } from 'components/assets/localAssets/localStyle';
import categoryService from 'components/services/categoryService'; 
import descriptionService from 'components/services/descriptionService'; 
import transactionEntryService from 'components/services/transactionEntryService';

const TransactionEntryForm = () => {
  // Flag to control data fetching
  const shouldFetchData = true; // Set to true to fetch from server, false to use mock data
  const [transaction, setTransaction] = useState({
    amount: '',
    date: ''
  });


  //work around
  //Want to eventually use a .env file.
  const CATEGORIES = [
    { id: '507f1f77bcf86cd799439011', name: 'Cat' },
  ];
  
  const DESCRIPTIONS = [
    { id: '507f1f77bcf86cd799439012', name: 'MAYO CLINIC' },

  ];

  const [categories, setCategories] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [descriptions, setDescriptions] = useState(DESCRIPTIONS);
  const [selectedDescription, setSelectedDescription] = useState('');
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'


  useEffect(() => {
    if (shouldFetchData) {
      const fetchData = async () => {
        try {
          const fetchedCategories = await categoryService.getCategories();
          setCategories(fetchedCategories);
          const fetchedDescriptions = await descriptionService.getDescriptions(); 
          setDescriptions(fetchedDescriptions);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [shouldFetchData]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleCategoryChange  = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setSelectedDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Fix the structure of the categories and descriptions state
    const category = categories.find(cat => cat.name === selectedCategory);
    const description = descriptions.find(desc => desc.name === selectedDescription);
  
    if (!category || !description) {
      console.error('Category or description not found');
      return; 
    }
  
    try {
      const transactionData = {
        categoryId: category.id, 
        descriptionId: description.id, 
        amount: transaction.amount,
        date: transaction.date,
      };

      
  
      await transactionEntryService.addTransaction(transactionData);
            // Set success message
            setMessage('Transaction successfully created!');
            setMessageType('success');
          } catch (error) {
            console.error('Error submitting transaction:', error);
            // Set error message
            setMessage('Failed to create transaction.');
            setMessageType('error');

      
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="date">Select Date</Label>
      <Input
        type="date"
        name="date"
        value={transaction.date}
        onChange={handleChange}
        required
      />
            <Label htmlFor="categoryName">Category</Label>
      <Input 
        list="categoryOptions" 
        name="categoryName" 
        value={selectedCategory} 
        onChange={handleCategoryChange} 
        required 
      />
     <datalist id="categoryOptions">
  {categories.map((category, index) => (
    <option key={index} value={category.name} />
  ))}
</datalist>
      <Label htmlFor="descriptionName">Description</Label>
      <Input 
        list="descriptionOptions" 
        name="descriptionName" 
        value={selectedDescription} 
        onChange={handleDescriptionChange} 
        required 
      />
      <datalist id="descriptionOptions">
  {descriptions.map((description, index) => (
    <option key={index} value={description.name} />
  ))}
</datalist>

      <Label htmlFor="amount">Amount</Label>
      <Input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        required
      />
 {/* Message display */}
 {message && (
        <div style={{ color: messageType === 'error' ? 'red' : 'green' }}>
          {message}
        </div>
      )}
      <Button type="submit">Add Transaction</Button>
    </form>
  );
};

export default TransactionEntryForm;
