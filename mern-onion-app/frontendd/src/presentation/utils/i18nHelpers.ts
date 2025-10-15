import { KeuzeModule } from '../../application/usecases/keuzeModuleUsecases';

export function getLocalizedField(module: KeuzeModule, lang: string, field: keyof Omit<KeuzeModule, '_id' | 'translations' | 'tags' | 'createdAt' | 'updatedAt'>) {
  const translations = module.translations as any;
  const localized = translations?.[lang]?.[field];
  if (localized && typeof localized === 'string' && localized.trim().length > 0) return localized;
  // fallback to base field
  return (module as any)[field] ?? '';
}