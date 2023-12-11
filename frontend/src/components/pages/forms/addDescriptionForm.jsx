// AddDescriptionForm.js
import React, { useState } from 'react';
import descriptionService from 'components/services/descriptionService';

const AddDescriptionForm = ({ onDescriptionAdded }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await descriptionService.addDescription(description);
      onDescriptionAdded(description); // Callback to inform parent component
      setDescription(''); // Reset the input field after successful submission
    } catch (error) {
      setError('Failed to add description'); // Display error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter new description"
        required
      />
      <button type="submit">Add Description</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AddDescriptionForm;
