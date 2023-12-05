import React, { useState, useEffect } from 'react';
import { Label, Input, Button } from 'components/assets/localStyle';
import categoryService from 'components/services/categoryService'; 
import descriptionService from 'components/services/descriptionService'; 
import transactionEntryService from 'components/services/transactionEntryService';

const TransactionEntryForm = () => {
  const [categories, setCategories] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [transaction, setTransaction] = useState({ amount: '', date: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    // Fetch the real data
    const fetchData = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        const fetchedDescriptions = await descriptionService.getDescriptions();
        setCategories(fetchedCategories);
        setDescriptions(fetchedDescriptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setSelectedDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = categories.find(cat => cat.name === selectedCategory);
    const description = descriptions.find(desc => desc.name === selectedDescription);

    if (!category || !description) {
      setMessage('Category or description not selected.');
      setMessageType('error');
      return;
    }

    const transactionData = {
      categoryId: category._id, // Changed from 'id' to '_id'
      descriptionId: description._id, // Changed from 'id' to '_id'
      amount: transaction.amount,
      date: transaction.date,
    };

    try {
      await transactionEntryService.addTransaction(transactionData);
      setMessage('Transaction successfully added!');
      setMessageType('success');
      // Reset form state if needed
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setMessage('Failed to add transaction.');
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
        {categories.map((category) => (
          <option key={category._id} value={category.name} />
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
        {descriptions.map((description) => (
          <option key={description._id} value={description.name} />
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
