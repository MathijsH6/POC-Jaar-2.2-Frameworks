import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listKeuzeModules, getFavoritesForCurrentUser, toggleFavorite, KeuzeModule } from '../../application/usecases/keuzeModuleUsecases';
import ModuleCard from '../components/ModuleCard';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { useAlert } from '../../contexts/AlertContext';
import Input from '../components/Input';

export const KeuzeModuleList: React.FC = () => {
  const [modules, setModules] = useState<KeuzeModule[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { show } = useAlert();

  // filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [minEC, setMinEC] = useState<number | ''>('');
  const [maxEC, setMaxEC] = useState<number | ''>('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({});

  // load modules
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const list = await listKeuzeModules();
        setModules(list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // load favorites for current user (so favorites stay marked when returning to this page)
  useEffect(() => {
    (async () => {
      try {
        if (!isAuthenticated) {
          setFavoriteIds({});
          return;
        }
        const favs = await getFavoritesForCurrentUser();
        const map: Record<string, boolean> = {};
        favs.forEach((m: any) => { map[m._id ?? String(m)] = true; });
        setFavoriteIds(map);
      } catch (err) {
        console.error('failed to load favorites', err);
      }
    })();
  }, [isAuthenticated]);

  // debounce searchTerm
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // helper lists for filter controls
  const { locations, levels, tags } = useMemo(() => {
    const locSet = new Set<string>();
    const lvlSet = new Set<string>();
    const tagSet = new Set<string>();
    modules.forEach(m => {
      if (m.location) locSet.add(m.location);
      if (m.level) lvlSet.add(m.level);
      (m.tags || []).forEach(t => tagSet.add(t));
    });
    return {
      locations: Array.from(locSet).sort(),
      levels: Array.from(lvlSet).sort(),
      tags: Array.from(tagSet).sort(),
    };
  }, [modules]);

  // filtered modules computed from filters + search
  const filteredModules = useMemo(() => {
    return modules.filter(m => {
      // EC filter
      if (minEC !== '' && m.studycredit < Number(minEC)) return false;
      if (maxEC !== '' && m.studycredit > Number(maxEC)) return false;

      // location & level filters
      if (locationFilter !== 'all' && m.location !== locationFilter) return false;
      if (levelFilter !== 'all' && m.level !== levelFilter) return false;

      // tags filter: require all selected tags to be present (AND)
      const selectedTagKeys = Object.keys(selectedTags).filter(k => selectedTags[k]);
      if (selectedTagKeys.length > 0) {
        const moduleTags = (m.tags || []).map(t => String(t).toLowerCase());
        if (!selectedTagKeys.every(t => moduleTags.includes(t.toLowerCase()))) return false;
      }

      // search term across many fields
      if (debouncedSearch) {
        const q = debouncedSearch;
        const haystack = [
          m.name, m.shortdescription, m.description, m.content,
          m.learningoutcomes, ...(m.tags || []),
        ].filter(Boolean).join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [modules, debouncedSearch, minEC, maxEC, locationFilter, levelFilter, selectedTags]);

  const handleToggle = async (id: string) => {
    try {
      if (!isAuthenticated) {
        show(t('auth.login_required'), 'error');
        return;
      }
      await toggleFavorite(id);
      if (isAuthenticated) {
        const favs = await getFavoritesForCurrentUser();
        const map: Record<string, boolean> = {};
        favs.forEach((m: any) => { map[m._id ?? String(m)] = true; });
        setFavoriteIds(map);
      } else {
        setFavoriteIds({});
      }
    } catch (err) {
      console.error('toggle failed', err);
      show(t('errors.favorite_failed') ?? 'Failed to toggle favorite', 'error');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setMinEC('');
    setMaxEC('');
    setLocationFilter('all');
    setLevelFilter('all');
    setSelectedTags({});
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => ({ ...prev, [tag]: !prev[tag] }));
  };

  const selectedTagKeys = Object.keys(selectedTags).filter(k => selectedTags[k]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{t('list.title')}</h1>

      {/* filter panel */}
      <div className="mb-6 app-card p-4 rounded shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            type="search"
            placeholder={t('filters.search_placeholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="col-span-1 md:col-span-2"
          />

          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder={t('filters.min_ec')}
              value={minEC === '' ? '' : String(minEC)}
              onChange={e => setMinEC(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-24"
            />
            <span className="app-muted">-</span>
            <Input
              type="number"
              placeholder={t('filters.max_ec')}
              value={maxEC === '' ? '' : String(maxEC)}
              onChange={e => setMaxEC(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-24"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="border rounded px-2 py-1 app-card text-sm"
            >
              <option value="all">{t('filters.all_locations')}</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>

            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="border rounded px-2 py-1 app-card text-sm"
            >
              <option value="all">{t('filters.all_levels')}</option>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>

            <button onClick={clearFilters} className="ml-3 px-3 py-1 rounded border app-card">{t('filters.reset')}</button>
          </div>

          {/* Tags / keywords filter (full width row under controls) */}
          <div className="col-span-1 md:col-span-4 mt-2">
            <div className="text-sm app-muted mb-2">{t('filters.keywords')}</div>
            <div className="flex flex-wrap gap-2">
              {tags.length === 0 ? (
                <div className="text-xs app-muted">{/* no tags found */}</div>
              ) : tags.map(tag => {
                const active = !!selectedTags[tag];
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={active}
                    className={`px-2 py-1 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      active ? 'app-accent-bg' : 'border app-card text-sm'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* show selected tags as removable pills (optional) */}
            {selectedTagKeys.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="text-sm app-muted">{selectedTagKeys.length} geselecteerd:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedTagKeys.map(k => (
                    <button
                      key={`sel-${k}`}
                      type="button"
                      onClick={() => toggleTag(k)}
                      className="px-2 py-0.5 rounded text-xs border app-card"
                      aria-label={`Verwijder filter ${k}`}
                    >
                      {k} ✕
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* results */}
      {loading ? <div className="app-muted">{t('loading')}</div> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map(m => (
          <ModuleCard
            key={m._id ?? m.name}
            module={m}
            isFavorite={!!favoriteIds[m._id ?? String(m.name)]}
            onToggleFavorite={handleToggle}
            onOpen={(id) => navigate(`/keuzemodules/${id}`)}
          />
        ))}
      </div>

      {filteredModules.length === 0 && !loading && (
        <div className="mt-6 app-muted">{t('no_results')}</div>
      )}
    </div>
  );
};

export default KeuzeModuleList;