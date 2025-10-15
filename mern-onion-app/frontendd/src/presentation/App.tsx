import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { AlertProvider } from '../contexts/AlertContext';
import { I18nProvider } from '../contexts/I18nContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import Layout from './layout';
import Home from './pages/Home';
import KeuzeModuleList from './pages/KeuzeModuleList';
import KeuzeModuleDetail from './pages/KeuzeModuleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyFavorites from './pages/MyFavorites';

export default function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <ThemeProvider>
          <AlertProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/keuzemodules" element={<KeuzeModuleList />} />
                  <Route path="/keuzemodules/:id" element={<KeuzeModuleDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/favorites" element={<MyFavorites />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AlertProvider>
        </ThemeProvider>
      </I18nProvider>
    </AuthProvider>
  );
}
