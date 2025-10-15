import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getKeuzeModule, toggleFavorite, getFavoritesForCurrentUser, KeuzeModule } from '../../application/usecases/keuzeModuleUsecases';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { getLocalizedField } from '../utils/i18nHelpers';
import { useAlert } from '../../contexts/AlertContext';

export const KeuzeModuleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [module, setModule] = useState<KeuzeModule | null>(null);
  const [isFav, setIsFav] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { lang, t } = useI18n();
  const { show } = useAlert();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const m = await getKeuzeModule(id);
        setModule(m);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated || !id) {
      setIsFav(false);
      return;
    }
    (async () => {
      try {
        const favs = await getFavoritesForCurrentUser();
        const favIds = favs.map((f: any) => f._id ?? String(f));
        setIsFav(favIds.includes(id));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [isAuthenticated, id]);

  const handleToggle = async () => {
    if (!id) return;
    if (!isAuthenticated) {
      show(t('auth.login_required'), 'error');
      return;
    }
    try {
      const favs = await toggleFavorite(id);
      const ids = favs.map((f: any) => f._id ?? String(f));
      setIsFav(ids.includes(id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!module) return <div className="p-6">{t('loading')}</div>;

  const title = getLocalizedField(module, lang, 'name');
  const short = getLocalizedField(module, lang, 'shortdescription');
  const description = getLocalizedField(module, lang, 'description');
  const content = getLocalizedField(module, lang, 'content');
  const learningoutcomes = getLocalizedField(module, lang, 'learningoutcomes');

  return (
    <main className="min-h-screen pt-0 flex items-start justify-center bg-[var(--app-bg)]">
      <div className="w-full max-w-3xl mx-4">
        <div className="app-card p-6 rounded-lg shadow">
          <button onClick={() => navigate(-1)} className="mb-4 text-sm app-muted hover:underline">
            {t('detail.back')}
          </button>

          <header className="mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm app-muted mt-1">{short}</p>

            <div className="mt-3 flex items-center space-x-4 text-sm app-muted">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{module.studycredit} {t('ec')}</span>
              <span>{module.location}</span>
              <span className="hidden sm:inline">| {module.level}</span>
            </div>
          </header>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{t('detail.description')}</h2>
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{description}</p>
          </section>

          {content && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{t('detail.content')}</h2>
              <div className="prose dark:prose-invert text-gray-700 dark:text-gray-200">
                <p>{content}</p>
              </div>
            </section>
          )}

          {learningoutcomes && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{t('detail.learningoutcomes')}</h2>
              <p className="text-gray-700 dark:text-gray-200">{learningoutcomes}</p>
            </section>
          )}

          <div className="mt-6">
            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded-md ${isFav ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
            >
              {isFav ? t('detail.remove_favorite') : t('detail.add_favorite')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KeuzeModuleDetail;