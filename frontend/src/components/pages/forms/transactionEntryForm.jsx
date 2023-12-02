import React, { useState, useEffect } from 'react';
import { Label, Input, Button } from 'components/assets/localAssets/localStyle';
import categoryService from 'components/services/categoryService'; 
import descriptionService from 'components/services/descriptionService'; 
import transactionEntryService from 'components/services/transactionEntryService';



const TransactionEntryForm = () => {
  // Flag to control data fetching
  const shouldFetchData = false; // Set to true to fetch from server, false to use mock data
  const [transaction, setTransaction] = useState({
    amount: '',
    date: ''
  });


  //work around
  //Want to eventually use a .env file.
  const CATEGORIES = [
    { id: '507f1f77bcf86cd799439011', name: 'Magni&Sanders' },
    { id: '6565ee6a90f7e13d3d873c5e', name: 'Groceries' },
    { id: '6565ee7855b92240e7b84a75', name: 'Phone' },
    { id: '6565ee7fd28d19c9f0dc6ac4', name: 'Software Subscriptions' },
    { id: '6565ee88d973254b47edbde1', name: 'Streaming Services' },
    { id: '6565ee9031c33c8ee5cffb22', name: 'Internet' },
    { id: '6565eea7957bb789458db5b7', name: 'Gaming' },
    { id: '6565eeadd78f3b87a8c95985', name: 'Rent' },
    { id: '6565eeb31e5cf6aa9d2da4a5', name: 'Income' },
    { id: '6565eeb93b577e03a4528c9e', name: 'Vehicle' },
    { id: '6565eec1534166bd5c39f7f6', name: 'Laundary' },
    { id: '6565eec669a1011e7c967620', name: 'Vaping' },
    { id: '6565eecb72f322ee17efbfb8', name: 'Discover' },
    { id: '6565eed0cfa234edb5aede19', name: 'Medical' },
  ];
  
  const DESCRIPTIONS = [
    { id: '507f1f77bcf86cd799439012', name: 'MAYO CLINIC' },
    { id: '6565eefa921d91ec181c539c', name: 'North Memorial' },
    { id: '6565ef00f50b490551978f41', name: 'Amazon Pharmacy' },
    { id: '6565ef0698241844aa7501fd', name: 'ATT' },
    { id: '6565ef0b6c9b25865a96f652', name: 'FULGAZ' },
    { id: '6565ef10a965ae6948a35bf9', name: 'PRIME VIDEO' },
    { id: '6565ef1472ea3bd305287c26', name: 'YOUTUBEPREMIUM' },
    { id: '6565ef196601f6686d509a22', name: 'NETFLIX.COM' },
    { id: '6565ef1e632f9fc1021c1eb5', name: 'CHATGPT' },
    { id: '6565ef231e2d498aff93ee25', name: 'COMBAST CABLE' },
    { id: '6565ef231e2d498aff93ee25', name: 'BDS LAUNDRY' },
    { id: '6565ef2b465e499e7f0b0a35', name: '3CHI.COM' },
    { id: '6565ef2fb26523f0ceb6c8c0', name: 'SAGE' },
    { id: '6565ef3359fe8afbe29b34fa', name: 'OLDREPUBLICTTLPAYROLL' },
    { id: '6565ef39c4250ad4318eabb1', name: 'XCELENERGY' },
    { id: '6565ef4237b17f16c281ce5a', name: 'DISCOVERE-PAYMENT' },
    { id: '6565ef3d3eeae4eb847b246e', name: 'FETCH' },
    { id: '6565ef46c53810d990b1e2f7', name: 'LUNDS&BYERLYS' },
    { id: '6565ef4ab52d01685e5beb5e', name: 'STATE FARM INSURANCE' },
    { id: '6565ef4f32aed45bd81cd934', name: 'HONDA PMT' },
  
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
