import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../application/usecases/userUsecases';
import { useI18n } from '../../contexts/I18nContext';
import { useAlert } from '../../contexts/AlertContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { show } = useAlert();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // client-side validation
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = t('login.email') + ' is required';
    if (!password) errs.password = t('login.password') + ' is required';
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await loginUser(email, password);
      if (!token) throw new Error(t('errors.general'));
      login(user, token);
      show(t('login.title') + ' successful', 'success');
      navigate('/');
    } catch (err: any) {
      const serverErrors = err?.response?.data?.errors;
      if (serverErrors && typeof serverErrors === 'object') {
        setFieldErrors(serverErrors);
      } else {
        show(err?.response?.data?.message || err?.message || t('errors.general'), 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--app-bg)]">
      <div className="app-card shadow rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">{t('login.title')}</h2>
        <p className="text-sm app-muted mb-6">{t('login.subtitle')}</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium app-muted mb-1">{t('login.email')}</label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'err-email' : undefined}
            />
            {fieldErrors.email && <div id="err-email" role="alert" className="text-red-600 text-sm mt-1">{fieldErrors.email}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium app-muted mb-1">{t('login.password')}</label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.password')}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'err-password' : undefined}
            />
            {fieldErrors.password && <div id="err-password" role="alert" className="text-red-600 text-sm mt-1">{fieldErrors.password}</div>}
          </div>

          <div className="flex items-center space-x-3">
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 app-accent-bg rounded-md disabled:opacity-60 text-white">
              {loading ? `${t('login.submit')}…` : t('login.submit')}
            </button>

            <button type="button" onClick={() => navigate('/')} className="px-4 py-2 app-card border rounded-md">
              {t('login.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
