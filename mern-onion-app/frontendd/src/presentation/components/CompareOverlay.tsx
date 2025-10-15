import React, { useState } from 'react';
import { KeuzeModule } from '../../application/usecases/keuzeModuleUsecases';
import { useI18n } from '../../contexts/I18nContext';
import { getLocalizedField } from '../utils/i18nHelpers';

type Props = {
  favorites: KeuzeModule[];
  onClose: () => void;
  onRemove?: (id: string) => void;
};

export const CompareOverlay: React.FC<Props> = ({ favorites, onClose, onRemove }) => {
  const [leftId, setLeftId] = useState<string | null>(null);
  const [rightId, setRightId] = useState<string | null>(null);
  const { lang, t } = useI18n();
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const first = dialogRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        if (focusables.length === 0) return;
        const idx = focusables.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx === 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
        else if (!e.shiftKey && idx === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, side: 'left' | 'right') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    if (side === 'left') setLeftId(id);
    else setRightId(id);
  };

  const allowDrop = (e: React.DragEvent) => { e.preventDefault(); };
  const findModule = (id: string | null) => favorites.find(f => f._id === id) ?? null;

  const ModulePreview: React.FC<{ module: KeuzeModule | null }> = ({ module }) => {
    if (!module) return <div className="text-sm app-muted">{t('compare.drop_hint')}</div>;

    const title = getLocalizedField(module, lang, 'name');
    const short = getLocalizedField(module, lang, 'shortdescription');
    const description = getLocalizedField(module, lang, 'description');
    const content = getLocalizedField(module, lang, 'content');
    const learningoutcomes = getLocalizedField(module, lang, 'learningoutcomes');

    return (
      <div className="p-3 border rounded app-card text-sm space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="text-xs app-muted mt-1">{module.location} • {module.level} • {module.studycredit} {t('ec')}</div>
          </div>
        </div>

        <p className="text-sm app-muted mt-2 whitespace-pre-line">{short}</p>

        <details className="mt-2" aria-label={`${title} details`}>
          <summary className="cursor-pointer text-sm app-accent">{t('compare.info')}</summary>
          <div className="mt-2 text-sm app-muted space-y-2">
            {description && <p><strong>{t('detail.description')}:</strong> <span className="whitespace-pre-line">{description}</span></p>}
            {content && <p><strong>{t('detail.content')}:</strong> <span className="whitespace-pre-line">{content}</span></p>}
            {learningoutcomes && <p><strong>{t('detail.learningoutcomes')}:</strong> <span className="whitespace-pre-line">{learningoutcomes}</span></p>}
            {module.tags && module.tags.length > 0 && <p><strong>{t('filters.keywords')}:</strong> {module.tags.join(', ')}</p>}
          </div>
        </details>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-hidden={false}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="compare-title" className="relative z-10 max-w-6xl w-full mx-4">
        <div className="app-card rounded shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 id="compare-title" className="text-lg font-semibold">{t('compare.title')}</h2>
            <button onClick={onClose} aria-label={t('compare.done')} className="px-3 py-1 rounded app-card border">{t('compare.done')}</button>
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div
              className="min-h-[220px] p-3 border rounded flex flex-col gap-3 app-card"
              onDragOver={allowDrop}
              onDrop={(e) => handleDrop(e, 'left')}
            >
              <div className="font-medium text-sm">{t('compare.left')}</div>
              <ModulePreview module={findModule(leftId)} />
              {leftId && onRemove && <button onClick={() => { onRemove(leftId); setLeftId(null); }} className="text-sm app-error-bg">{t('compare.remove_from_favorites')}</button>}
            </div>

            <div
              className="p-3 border rounded app-card"
              style={{
                maxHeight: favorites.length >= 3 ? 360 : undefined,
                overflowY: favorites.length >= 3 ? 'auto' : undefined,
              }}
            >
              <div className="font-medium mb-2">{t('compare.center')}</div>
              <ul className="space-y-2">
                {favorites.map(f => (
                  <li
                    key={f._id}
                    draggable
                    onDragStart={(e) => onDragStart(e, f._id!)}
                    className="p-2 rounded app-card hover:app-surface cursor-grab flex items-center justify-between"
                  >
                    <div className="text-sm">
                      <div className="font-medium">{getLocalizedField(f, lang, 'name')}</div>
                      <div className="text-xs app-muted">{f.location} • {f.studycredit} {t('ec')}</div>
                    </div>
                    <div className="text-xs app-muted">⋯</div>
                  </li>
                ))}
                {favorites.length === 0 && <li className="text-sm app-muted">{t('favorites.empty')}</li>}
              </ul>
            </div>

            <div
              className="min-h-[220px] p-3 border rounded flex flex-col gap-3 app-card"
              onDragOver={allowDrop}
              onDrop={(e) => handleDrop(e, 'right')}
            >
              <div className="font-medium text-sm">{t('compare.right')}</div>
              <ModulePreview module={findModule(rightId)} />
              {rightId && onRemove && <button onClick={() => { onRemove(rightId); setRightId(null); }} className="text-sm app-error-bg">{t('compare.remove_from_favorites')}</button>}
            </div>
          </div>

          <div className="p-4 border-t flex items-center justify-end gap-3">
            <button onClick={() => { setLeftId(null); setRightId(null); }} className="px-3 py-1 rounded app-card border">{t('compare.reset')}</button>
            <button
              onClick={() => {
                if (!leftId && !rightId) onClose();
              }}
              className="px-3 py-1 rounded app-accent-bg"
            >
              {t('compare.done')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareOverlay;