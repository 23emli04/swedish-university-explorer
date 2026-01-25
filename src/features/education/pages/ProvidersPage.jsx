import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEducationProviders } from '../hooks/useEducationProviders';
import ProviderCard from '../components/ProviderCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorAlert from '../components/ErrorAlert';
import EndpointConfigDialog from '../components/EndpointConfigDialog';
import { Search, Filter, RotateCcw, Building } from 'lucide-react';

export default function ProvidersPage() {
  const { data = [], loading, error, refetch } = useEducationProviders();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filterTown, setFilterTown] = useState('');
  const [filterType, setFilterType] = useState('');

  // 1. Generate the cleaned list of towns
  const towns = useMemo(() => {
    const set = new Set();
    data.forEach(p => {
      if (!p.townVisit) return;
      const town = p.townVisit.toLowerCase();
      // If contains digits, group under 'övrigt'
      if (/\d/.test(town)) {
        set.add('övrigt');
      } else {
        set.add(town);
      }
    });

    return Array.from(set).sort((a, b) => {
      if (a === 'övrigt') return 1;
      if (b === 'övrigt') return -1;
      return a.localeCompare(b, 'sv');
    });
  }, [data]);

  // 2. Generate the list of provider types (REPLACED the @babel/core import)
  const providerTypes = useMemo(() => {
    const set = new Set(data.map(p => p.bodyType).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'sv'));
  }, [data]);

  // 3. Filtering logic
  const filtered = useMemo(() => {
    return data.filter((p) => {
      const townLower = p.townVisit?.toLowerCase() || '';
      const logicalTown = /\d/.test(townLower) ? 'övrigt' : townLower;

      const matchesSearch =
          !search ||
          p.nameSwe?.toLowerCase().includes(search.toLowerCase()) ||
          townLower.includes(search.toLowerCase()) ||
          p.identifier?.toLowerCase().includes(search.toLowerCase());

      const matchesTown = !filterTown || logicalTown === filterTown;
      const matchesType = !filterType || p.bodyType === filterType;

      return matchesSearch && matchesTown && matchesType;
    });
  }, [data, search, filterTown, filterType]);

  const handleCardClick = (provider) => {
    if (!provider.identifier) return;
    navigate(`/education/providers/${provider.identifier}`);
  };

  const clearFilters = () => {
    setSearch('');
    setFilterTown('');
    setFilterType('');
  };

  return (
      <div className="container mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-base-300 pb-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-2">Lärosäten</h1>
            <p className="text-lg text-base-content/60">
              Utforska och filtrera utbildningsanordnare i Sverige
            </p>
          </div>
          <div className="flex gap-2">
            <EndpointConfigDialog onSave={refetch} />
            <button
                className={`btn btn-circle btn-ghost ${loading ? 'loading' : ''}`}
                onClick={refetch}
                title="Uppdatera data"
            >
              {!loading && <RotateCcw size={20} />}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-base-200 p-4 rounded-2xl shadow-inner flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
            <input
                type="text"
                placeholder="Sök på namn, stad eller ID..."
                className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2 px-2 opacity-60 text-sm font-bold uppercase">
              <Filter size={14} /> Filter:
            </div>

            <select
                className="select select-bordered select-sm md:select-md capitalize"
                value={filterTown}
                onChange={(e) => setFilterTown(e.target.value)}
                disabled={loading || towns.length === 0}
            >
              <option value="">Alla städer</option>
              {towns.map((t) => (
                  <option key={t} value={t}>
                    {t === 'övrigt' ? 'Övrigt' : t}
                  </option>
              ))}
            </select>

            <select
                className="select select-bordered select-sm md:select-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                disabled={loading || providerTypes.length === 0}
            >
              <option value="">Alla typer</option>
              {providerTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {(search || filterTown || filterType) && (
                <button className="btn btn-ghost btn-sm text-error font-bold" onClick={clearFilters}>
                  Rensa
                </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-4">
          {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <LoadingSkeleton rows={8} />
                <LoadingSkeleton rows={8} className="hidden sm:block" />
                <LoadingSkeleton rows={8} className="hidden lg:block" />
              </div>
          ) : error ? (
              <div className="max-w-2xl mx-auto py-10">
                <ErrorAlert error={error} onRetry={refetch} />
              </div>
          ) : (
              <>
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium opacity-60">
                      Visar <span className="text-base-content font-bold">{filtered.length}</span> av {data.length} lärosäten
                  </span>
                </div>

                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filtered.map((provider) => (
                          <div
                              key={provider.identifier}
                              className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                              onClick={() => handleCardClick(provider)}
                          >
                            <ProviderCard provider={provider} />
                          </div>
                      ))}
                    </div>
                ) : (
                    <div className="card bg-base-200 border-2 border-dashed border-base-300 py-20">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="bg-base-300 p-4 rounded-full">
                          <Building size={48} className="opacity-20" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Inga matchningar</h3>
                          <p className="opacity-60">Prova att ändra din sökning eller nollställ filtren.</p>
                        </div>
                        <button className="btn btn-primary btn-outline" onClick={clearFilters}>
                          Visa alla lärosäten
                        </button>
                      </div>
                    </div>
                )}
              </>
          )}
        </div>
      </div>
  );
}