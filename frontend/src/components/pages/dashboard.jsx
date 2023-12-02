
import DashboardForm from 'components/pages/forms/dashboardForm';
import { Container } from '@mui/material';
import ErrorBoundary from 'components/errorHandling/errorBoundary';

const Dashboard = () => {



// Render the static structure of the dashboard regardless of loading state
return (
  <ErrorBoundary>
  <Container>
  <div>
    <h1>Financial Dashboard</h1>
    <DashboardForm />
  </div>
  </Container>
  </ ErrorBoundary>
);
};

export default Dashboard;
