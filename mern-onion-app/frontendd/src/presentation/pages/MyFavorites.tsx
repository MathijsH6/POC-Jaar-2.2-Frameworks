import React, { useEffect, useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import CompareOverlay from '../components/CompareOverlay';
import { useAuth } from '../../contexts/AuthContext';
import { getFavoritesForCurrentUser, toggleFavorite } from '../../application/usecases/keuzeModuleUsecases';
import { useI18n } from '../../contexts/I18nContext';

export const MyFavorites: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        setFavorites([]);
        return;
      }
      try {
        const favs = await getFavoritesForCurrentUser();
        setFavorites(favs || []);
      } catch (err) {
        console.error('failed to load favorites', err);
        setFavorites([]);
      }
    })();
  }, [isAuthenticated]);

  const handleRemove = async (id: string) => {
    try {
      // gebruik toggleFavorite om favorite te verwijderen (server-side toggle)
      await toggleFavorite(id);
      setFavorites(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      console.error('failed to remove favorite', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">{t('header.favorites')}</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowCompare(true)} className="px-3 py-1 rounded app-accent-bg">{t('compare.title')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.map(f => (
          <ModuleCard
            key={f._id}
            module={f}
            isFavorite={true}
            onToggleFavorite={() => handleRemove(f._id)}
            onOpen={() => {}}
          />
        ))}
        {favorites.length === 0 && <div className="app-muted p-4 app-card rounded">{t('favorites.empty')}</div>}
      </div>

      {showCompare && (
        <CompareOverlay
          favorites={favorites}
          onClose={() => setShowCompare(false)}
          onRemove={(id) => { handleRemove(id); }}
        />
      )}
    </div>
  );
};

export default MyFavorites;