import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      {/* main content; pt-16 zorgt dat inhoud niet onder de fixed header valt */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  );
};
