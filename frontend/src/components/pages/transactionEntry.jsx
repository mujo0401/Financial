import React from 'react';
import TransactionForm from 'components/pages/forms/transactionEntryForm';
import { Container } from '@mui/material';
import ErrorBoundary from 'components/errorHandling/errorBoundary';



const TransactionEntry = () => {
  return (
    <ErrorBoundary>
    <Container>
    <div>
      <h1>Single Transaction Entries</h1>
      <TransactionForm />
    </div>
    </Container>
    </ ErrorBoundary>
  );
};

export default TransactionEntry;
