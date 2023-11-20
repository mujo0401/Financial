import React, { useState } from 'react';
import { PageContainer, theme, Input, Button } from '../styles/GlobalTheme'; // Adjust the import path as needed
import styled from 'styled-components';

// Styled components specific to TransactionEntry
const TransactionEntryContainer = styled.div`
  // Your specific styles for the container
`;

const Label = styled.label`
  color: ${theme.colors.text};
  // Additional label styling
`;

const SubmitButton = styled(Button)` // Assuming Button is a styled component from GlobalTheme
  // Additional styles for the submit button if needed
`;

function TransactionEntry() {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        const transaction = { date, description, amount };
    
        try {
            const response = await fetch('/transactionEntry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });
            if (response.ok) {
                setSuccessMessage('Transaction saved successfully');
                setDate('');
                setCategory('');
                setDescription('');
                setAmount(0);
            } else {
                console.error('Failed to save transaction');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [successMessage, setSuccessMessage] = useState('');

    return (
     <PageContainer>
        <TransactionEntryContainer>
            <form onSubmit={handleSubmit}>
                <Label>
                    Date:
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Label>
                <Label>
                    Description Name:
                    <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Label>
                <Label>
                    Category Name:
                    <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Label>
                <Label>
                    Amount:
                    <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Label>
                <SubmitButton type="submit">Submit Transaction</SubmitButton>
                {successMessage && <div>{successMessage}</div>}
            </form>
        </TransactionEntryContainer>
    </PageContainer>
    );
}

export default TransactionEntry;
