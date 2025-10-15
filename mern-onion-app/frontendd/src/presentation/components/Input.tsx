import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { id?: string; errorId?: string; label?: string };

export const Input: React.FC<Props> = ({ id, label, className = '', errorId, ...rest }) => {
  const finalId = id ?? `input-${Math.random().toString(36).slice(2, 8)}`;
  const hasError = !!rest['aria-invalid'];

  const base = 'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus-visible:ring-2 app-card';
  const errorStyling = hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600';

  return (
    <>
      {label && <label htmlFor={finalId} className="sr-only">{label}</label>}
      <input
        id={finalId}
        aria-invalid={rest['aria-invalid'] ?? undefined}
        aria-describedby={errorId}
        {...rest}
        className={`${base} ${errorStyling} ${className}`}
      />
    </>
  );
};

export default Input;
