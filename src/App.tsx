import './App.scss';
import './styles/global.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
