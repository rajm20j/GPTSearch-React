import './App.scss';
import './styles/global.scss';
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
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
