import React from 'react';
import TransactionForm from 'components/pages/forms/transactionEntryForm';
import { TransactionEntryPageContainer } from 'components/assets/localAssets/transactionEntryStyle';


const TransactionEntry = () => {
  return (
    <TransactionEntryPageContainer>
    <div>
      <h1>Single Transaction Entries</h1>
      <TransactionForm />
    </div>
    </TransactionEntryPageContainer>
  );
};

export default TransactionEntry;
