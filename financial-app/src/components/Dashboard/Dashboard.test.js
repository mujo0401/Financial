import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';

// Mock the FinancialService module
jest.mock('../../Services/FinancialService', () => ({
  getFinancialSummary: jest.fn().mockResolvedValue({ /* ...mocked data... */ }),
  getRecentTransactions: jest.fn().mockResolvedValue({ /* ...mocked data... */ }),
  getFinancialGoals: jest.fn().mockResolvedValue({ /* ...mocked data... */ })
}));

describe('Dashboard Component', () => {
  test('renders loading state', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders dashboard components after loading', async () => {
    render(<Dashboard />);
    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Financial Summary')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('renders error message on fetch failure', async () => {
    // Override mock to simulate an error
    jest.mocked(FinancialService.getFinancialSummary).mockRejectedValue(new Error('Network Error'));

    render(<Dashboard />);
    expect(await screen.findByText('Error: Network Error')).toBeInTheDocument();
  });

  test('renders data after file upload', () => {
    const { getByText, getByTestId } = render(<Dashboard />);
    const fileInput = getByTestId('file-upload-input');
    
    // Create a fake file
    const file = new File(['hello'], 'hello.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Upload the file
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Here, you should wait for the file to be processed and the data to be rendered.
    // This could be done with waitFor, findBy, or other async utilities from @testing-library/react.
    
    // Check if the data is rendered
    const renderedData = getByText('Data from the file');
    expect(renderedData).toBeInTheDocument();
  });
});
