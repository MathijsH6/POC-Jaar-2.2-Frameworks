import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export const Layout: React.FC = () => (
  <>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 bg-white dark:bg-gray-800 p-2 rounded z-50"
    >
      Skip to main content
    </a>

    <div className="min-h-screen flex flex-col app-surface">
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  </>
);

export default Layout;