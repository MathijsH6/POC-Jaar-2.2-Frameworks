import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useAuth } from '../../contexts/AuthContext';
import { registerUser, loginUser } from '../../application/usecases/userUsecases';
import { useI18n } from '../../contexts/I18nContext';
import { useAlert } from '../../contexts/AlertContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();
  const { show } = useAlert();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t('register.name') + ' is required';
    if (!email.trim()) errs.email = t('register.email') + ' is required';
    if (!password) errs.password = t('register.password') + ' is required';
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await registerUser({ name, email, password });

      // If backend did not return a token, try to login automatically.
      if (!token) {
        try {
          const loginRes = await loginUser(email, password);
          if (loginRes.token) {
            login(loginRes.user, loginRes.token);
            show(t('register.title') + ' successful', 'success');
            navigate('/');
            return;
          }
          // fallthrough if no token from loginRes
        } catch (loginErr) {
          // couldn't auto-login after register, but registration succeeded -> redirect to login
          show(t('register.title') + ' successful. Please login.', 'success');
          navigate('/login');
          return;
        }
      } else {
        // normal path: we have token
        login(user, token);
        show(t('register.title') + ' successful', 'success');
        navigate('/');
        return;
      }

      // Fallback: if we reach here, behave as success and go to login
      show(t('register.title') + ' successful. Please login.', 'success');
      navigate('/login');
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
        <h2 className="text-2xl font-bold mb-2">{t('register.title')}</h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium app-muted mb-1">{t('register.name')}</label>
            <Input id="reg-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('register.name')} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'err-name' : undefined} />
            {fieldErrors.name && <div id="err-name" role="alert" className="text-red-600 text-sm mt-1">{fieldErrors.name}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium app-muted mb-1">{t('register.email')}</label>
            <Input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'err-email' : undefined} />
            {fieldErrors.email && <div id="err-email" role="alert" className="text-red-600 text-sm mt-1">{fieldErrors.email}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium app-muted mb-1">{t('register.password')}</label>
            <Input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('register.password')} aria-invalid={!!fieldErrors.password} aria-describedby={fieldErrors.password ? 'err-password' : undefined} />
            {fieldErrors.password && <div id="err-password" role="alert" className="text-red-600 text-sm mt-1">{fieldErrors.password}</div>}
          </div>

          <div className="flex items-center space-x-3">
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 app-accent-bg rounded-md disabled:opacity-60 text-white">
              {loading ? `${t('register.submit')}…` : t('register.submit')}
            </button>

            <button type="button" onClick={() => navigate('/')} className="px-4 py-2 app-card border rounded-md">
              {t('register.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;