import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

const Protected = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Home /></Protected>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
