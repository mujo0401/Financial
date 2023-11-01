import React from 'react';

const GoalList = ({ goals }) => {
  return (
    <ul>
      {goals.map((goal, index) => (
        <li key={index}>
          {goal.title} - ${goal.currentAmount} / ${goal.targetAmount}
          {/* Add a progress bar or other visualization here */}
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
