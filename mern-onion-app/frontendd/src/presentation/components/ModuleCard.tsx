import React from 'react';
import { KeuzeModule } from '../../application/usecases/keuzeModuleUsecases';
import { useI18n } from '../../contexts/I18nContext';
import { getLocalizedField } from '../utils/i18nHelpers';

type Props = {
  module: KeuzeModule;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen?: (id: string) => void;
};

export const ModuleCard: React.FC<Props> = ({ module, isFavorite, onToggleFavorite, onOpen }) => {
  const { lang, t } = useI18n();
  const title = getLocalizedField(module, lang, 'name');
  const short = getLocalizedField(module, lang, 'shortdescription');
  const learning = getLocalizedField(module, lang, 'learningoutcomes');

  return (
    <article className="border rounded-lg p-4 app-card shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm app-muted mt-1">{short}</p>
          </div>

          <div className="ml-4 flex flex-col items-end gap-2">
            <button
              aria-pressed={isFavorite}
              onClick={() => onToggleFavorite(module._id!)}
              className={`px-2 py-1 rounded text-sm ${isFavorite ? 'app-accent-bg' : 'border app-card text-sm'}`}
              title={isFavorite ? t('card.favorite') : t('card.favorite_add')}
            >
              ★
            </button>

            {onOpen && (
              <button onClick={() => onOpen(module._id!)} className="text-xs app-muted">
                {t('card.view')}
              </button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm app-muted line-clamp-3">
            {learning ? (learning.length > 140 ? learning.slice(0, 140) + '…' : learning) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs app-muted">
        {module.location} • {module.level} • {module.studycredit} {t('ec')}
      </div>
    </article>
  );
};

export default ModuleCard;