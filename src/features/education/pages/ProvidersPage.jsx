import { useState, useMemo } from 'react';
import { useEducationProviders } from '../hooks/useEducationProviders';
import ProviderCard from '../components/ProviderCard';
import ProviderDetailDialog from '../components/ProviderDetailDialog';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorAlert from '../components/ErrorAlert';
import EndpointConfigDialog from '../components/EndpointConfigDialog';

export default function ProvidersPage() {
  const { data, loading, error, refetch } = useEducationProviders();
  const [search, setSearch] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [filterTown, setFilterTown] = useState('');
  const [filterType, setFilterType] = useState('');

  const towns = useMemo(() => {
    const set = new Set(data.map(p => p.town).filter(Boolean));
    return Array.from(set).sort();
  }, [data]);

  const types = useMemo(() => {
    const set = new Set(data.map(p => p.bodyType).filter(Boolean));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((p) => {
      const matchesSearch =
        !search ||
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.town?.toLowerCase().includes(search.toLowerCase());
      const matchesTown = !filterTown || p.town === filterTown;
      const matchesType = !filterType || p.bodyType === filterType;
      return matchesSearch && matchesTown && matchesType;
    });
  }, [data, search, filterTown, filterType]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Lärosäten</h1>
        <EndpointConfigDialog onSave={refetch} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Sök lärosäte..."
          className="input input-bordered flex-1 min-w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={filterTown}
          onChange={(e) => setFilterTown(e.target.value)}
        >
          <option value="">Alla städer</option>
          {towns.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Alla typer</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button className="btn btn-ghost" onClick={refetch} title="Ladda om">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {loading && <LoadingSkeleton rows={6} />}
      {error && <ErrorAlert error={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <p className="text-base-content/60 mb-4">{filtered.length} lärosäten</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((provider) => (
              <ProviderCard
                key={provider.identifier || provider.name}
                provider={provider}
                onClick={setSelectedProvider}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-base-content/60">
              Inga lärosäten hittades
            </div>
          )}
        </>
      )}

      <ProviderDetailDialog
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />
    </div>
  );
}
