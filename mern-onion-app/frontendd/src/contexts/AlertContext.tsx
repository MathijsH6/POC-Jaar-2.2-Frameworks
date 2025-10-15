import React, { createContext, useContext, useEffect, useState } from 'react';

type AlertType = 'info' | 'success' | 'error';
type Alert = { id: number; type: AlertType; text: string } | null;

const ctx = createContext<{ show: (text: string, type?: AlertType) => void } | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Alert>(null);

  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(t);
  }, [alert]);

  const show = (text: string, type: AlertType = 'info') => {
    setAlert({ id: Date.now(), type, text });
  };

  return (
    <ctx.Provider value={{ show }}>
      {children}
      {alert && (
        <div
          role="alert"
          aria-live="assertive"
          className={`fixed left-1/2 top-20 z-50 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${
            alert.type === 'error' ? 'app-error-bg' : alert.type === 'success' ? 'app-success-bg' : 'app-accent-bg'
          }`}
        >
          {alert.text}
        </div>
      )}
    </ctx.Provider>
  );
};

export function useAlert() {
  const c = useContext(ctx);
  if (!c) throw new Error('useAlert must be used within AlertProvider');
  return c;
}