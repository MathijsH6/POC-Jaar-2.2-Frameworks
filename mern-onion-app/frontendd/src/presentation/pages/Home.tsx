import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const Home = () => {
  const { user, logout } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome {user?.name || 'guest'}</h1>
      {user ? (
        <button onClick={logout} className="mt-4 px-3 py-2 rounded border">Logout</button>
      ) : null}
    </div>
  );
};
