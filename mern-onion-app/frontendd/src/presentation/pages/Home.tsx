import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useI18n();

  return (
    <main className="min-h-screen pt-24 flex items-start justify-center bg-[var(--app-bg)]">
      <section className="w-full max-w-3xl mx-4">
        <div className="app-card p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {t('home.welcome')} {user?.name ?? t('home.guest')}
          </h1>

          <p className="mb-4 app-muted">{t('home.description')}</p>

          <ul className="list-disc pl-5 mb-4 app-muted text-left inline-block text-sm">
            <li>{t('home.list.item1')}</li>
            <li>{t('home.list.item2')}</li>
            <li>{t('home.list.item3')}</li>
          </ul>

          <section aria-labelledby="accessibility-title" className="mt-4 text-left">
            <h2 id="accessibility-title" className="text-lg font-medium mb-2">{t('home.accessibility.title')}</h2>

            <details className="mb-3">
              <summary className="cursor-pointer font-medium">{t('home.accessibility.tips_summary')}</summary>
              <div className="mt-2 text-sm app-muted space-y-2">
                <p>{t('home.accessibility.p1')}</p>
                <p>{t('home.accessibility.p2')}</p>
                <p>{t('home.accessibility.p3')}</p>
                <p>{t('home.accessibility.p4')}</p>
                <p>{t('home.accessibility.p5')}</p>
              </div>
            </details>

            <details>
              <summary className="cursor-pointer font-medium">{t('home.checklist.summary')}</summary>
              <ol className="mt-2 list-decimal pl-5 text-sm app-muted space-y-1">
                <li>{t('home.checklist.item1')}</li>
                <li>{t('home.checklist.item2')}</li>
                <li>{t('home.checklist.item3')}</li>
              </ol>
            </details>
          </section>

          <div className="mt-6">
            {user ? (
              <button onClick={logout} className="px-4 py-2 rounded app-error-bg text-white">{t('home.logout')}</button>
            ) : (
              <p className="text-sm app-muted">{t('home.login_prompt')}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;