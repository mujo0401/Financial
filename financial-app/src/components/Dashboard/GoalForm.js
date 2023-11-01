import React, { useState } from 'react';

const GoalForm = ({ onSubmit }) => {
  const [goal, setGoal] = useState({
    title: '',
    description: '',
    targetAmount: '',
    currentAmount: 0,
    dueDate: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title: <input type="text" name="title" value={goal.title} onChange={handleChange} /></label>
      <label>Description: <textarea name="description" value={goal.description} onChange={handleChange} /></label>
      <label>Target Amount: <input type="number" name="targetAmount" value={goal.targetAmount} onChange={handleChange} /></label>
      <label>Due Date: <input type="date" name="dueDate" value={goal.dueDate} onChange={handleChange} /></label>
      <label>Category: <input type="text" name="category" value={goal.category} onChange={handleChange} /></label>
      <button type="submit">Create Goal</button>
    </form>
  );
};

export default GoalForm;
