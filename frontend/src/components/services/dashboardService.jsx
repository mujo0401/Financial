const DASHBOARD_URL = 'http://localhost:3000/api/dashboard'

// Fetch spending data over time
export const fetchSpendingOverTime = async (startDate, endDate) => {
  try {
    const response = await fetch(`${DASHBOARD_URL}/spending-over-time?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching spending over time:', error);
    throw error;
  }
};

// Fetch category-wise spending data
export const fetchCategoryWiseSpending = async (startDate, endDate) => {
  try {
    const response = await fetch(`${DASHBOARD_URL}/category-wise-spending?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching category-wise spending:', error);
    throw error;
  }
};

// Fetch monthly income vs expense data
export const fetchMonthlyIncomeVsExpense = async (startDate, endDate) => {
  try {
    const response = await fetch(`${DASHBOARD_URL}/monthly-income-expense?startDate=${startDate}&endDate=${endDate}`, {
    
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching monthly income vs expense:', error);
    throw error;
  }
}
