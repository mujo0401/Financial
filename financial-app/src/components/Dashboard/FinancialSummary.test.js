import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinancialSummary from './FinancialSummary';

describe('FinancialSummary Component', () => {
  const mockData = { /* ...mocked data... */ };

  test('renders financial summary data', () => {
    render(<FinancialSummary data={mockData} />);
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    // Add more assertions based on your implementation
  });
});
