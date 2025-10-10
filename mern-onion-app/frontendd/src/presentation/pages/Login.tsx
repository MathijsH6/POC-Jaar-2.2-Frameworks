import React, { useState } from 'react';
import { Input } from '../components/Input';
import { loginUser } from '../../application/usecases/userUsecases';
import { useAuth } from '../../contexts/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await loginUser(email, password);
      login(user);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="block mt-4 mb-2">Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <div className="text-red-600 mt-2">{error}</div>}

        <button className="mt-4 px-4 py-2 rounded bg-blue-600 text-white" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
