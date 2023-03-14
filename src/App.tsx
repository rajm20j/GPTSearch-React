import './App.scss';
import './styles/globals.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing/LandingPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<Navigate to={'/landing'} />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
