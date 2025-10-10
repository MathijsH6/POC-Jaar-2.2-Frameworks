import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../domain/models';
import { fetchProfile } from '../application/usecases/userUsecases';

type AuthContextType = {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (u: User) => setUser(u);
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refresh = async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      try { await refresh(); } catch {};
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
