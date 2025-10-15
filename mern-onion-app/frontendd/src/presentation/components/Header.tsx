import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useI18n } from '../../contexts/I18nContext';

const SunIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className={props.className}>
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="1.5" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22.5" y2="12" />
      <line x1="4.2" y1="4.2" x2="6.2" y2="6.2" />
      <line x1="17.8" y1="17.8" x2="19.8" y2="19.8" />
      <line x1="4.2" y1="19.8" x2="6.2" y2="17.8" />
      <line x1="17.8" y1="6.2" x2="19.8" y2="4.2" />
    </g>
  </svg>
);

const MoonIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className={props.className}>
    <path d="M21 12.8A8.8 8.8 0 1111.2 3 6.5 6.5 0 0021 12.8z" fill="currentColor" />
  </svg>
);

const ColorblindIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={props.className}>
    <circle cx="9" cy="12" r="5" fill="#0b5fff" />
    <circle cx="15" cy="12" r="5" fill="#ff8a3d" opacity="0.92" />
  </svg>
);

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      if (menuRef.current && btnRef.current && !menuRef.current.contains(e.target as Node) && !btnRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const IconFor = (th: string) => {
    if (th === 'dark') return <MoonIcon />;
    if (th === 'colorblind') return <ColorblindIcon />;
    return <SunIcon />;
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 app-surface shadow z-50">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold app-accent">{t('app.name')}</Link>
          <nav className="hidden sm:flex items-center space-x-4">
            <NavLink to="/keuzemodules" className={({ isActive }) => (isActive ? 'app-accent' : 'app-muted')}>{t('header.keuzemodules')}</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <select
            aria-label={t('header.lang')}
            value={lang}
            onChange={e => setLang(e.target.value as any)}
            className="border rounded px-2 py-1 app-card text-sm"
          >
            <option value="nl">NL</option>
            <option value="en">EN</option>
          </select>

          <div className="relative">
            <button
              ref={btnRef}
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              className="flex items-center gap-2 border rounded px-2 py-1 app-card text-sm"
              aria-label={t('header.theme')}
              title={t(`header.theme.${theme}`)}
            >
              <span className="sr-only">{t('header.theme')}</span>
              <span className="w-4 h-4">{IconFor(theme)}</span>
            </button>

            {open && (
              <ul ref={menuRef} role="menu" className="absolute right-0 mt-2 app-card border rounded shadow-sm p-1 space-y-1 z-50">
                <li>
                  <button
                    role="menuitem"
                    aria-label={t('header.theme.light')}
                    onClick={() => { setTheme('light'); setOpen(false); }}
                    className="inline-flex items-center justify-center p-1 rounded hover:app-accent-bg w-10 h-10"
                    title={t('header.theme.light')}
                  >
                    <SunIcon />
                    <span className="sr-only">{t('header.theme.light')}</span>
                  </button>
                </li>
                <li>
                  <button
                    role="menuitem"
                    aria-label={t('header.theme.dark')}
                    onClick={() => { setTheme('dark'); setOpen(false); }}
                    className="inline-flex items-center justify-center p-1 rounded hover:app-accent-bg w-10 h-10"
                    title={t('header.theme.dark')}
                  >
                    <MoonIcon />
                    <span className="sr-only">{t('header.theme.dark')}</span>
                  </button>
                </li>
                <li>
                  <button
                    role="menuitem"
                    aria-label={t('header.theme.colorblind')}
                    onClick={() => { setTheme('colorblind'); setOpen(false); }}
                    className="inline-flex items-center justify-center p-1 rounded hover:app-accent-bg w-10 h-10"
                    title={t('header.theme.colorblind')}
                  >
                    <ColorblindIcon />
                    <span className="sr-only">{t('header.theme.colorblind')}</span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <span className="sr-only">Ingelogd als</span>
              <div className="hidden sm:block text-sm app-muted">Hi, {user?.name}</div>
              <Link to="/favorites" className="text-sm app-muted">{t('header.favorites')}</Link>
              <button onClick={() => { logout(); navigate('/'); }} className="px-3 py-1 rounded app-error-bg">{t('header.logout')}</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm app-muted">{t('header.login')}</NavLink>
              <NavLink to="/register" className="text-sm app-muted">{t('header.register')}</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;