import "./App.scss";
import "./styles/global.scss";
import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const LandingPage = lazy(() => import("./pages/Landing/LandingPage"));
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LazyLoadingComponent from "./common/LazyLoadingComponent/LazyLoadingComponent";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              <LazyLoadingComponent>
                <LandingPage />
              </LazyLoadingComponent>
            }
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
