import React from 'react';
import TransactionForm from 'components/pages/forms/transactionEntryForm';
import { Container } from '@mui/material';


const TransactionEntry = () => {
  return (
    <Container>
    <div>
      <h1>Single Transaction Entries</h1>
      <TransactionForm />
    </div>
    </Container>
  );
};

export default TransactionEntry;
