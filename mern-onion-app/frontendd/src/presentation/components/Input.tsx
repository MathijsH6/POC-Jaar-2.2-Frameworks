import React from 'react';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`border rounded p-2 w-full ${props.className || ''}`} />
);
