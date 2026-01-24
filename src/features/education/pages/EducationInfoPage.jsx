import { useState, useMemo } from 'react';
import { useEducationInfos } from '../hooks/useEducationInfo';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorAlert from '../components/ErrorAlert';
import EndpointConfigDialog from '../components/EndpointConfigDialog';

export default function EducationInfoPage() {
  const { data, loading, error, refetch } = useEducationInfos();
  const [search, setSearch] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(null);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      item.identifier?.toLowerCase().includes(q) ||
      item.titleSwe?.toLowerCase().includes(q) ||
      item.titleEng?.toLowerCase().includes(q)
    );
  }, [data, search]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Utbildningsinformation</h1>
        <EndpointConfigDialog onSave={refetch} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Sök..."
          className="input input-bordered flex-1 min-w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-ghost" onClick={refetch} title="Ladda om">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {loading && <LoadingSkeleton rows={8} />}
      {error && <ErrorAlert error={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <p className="text-base-content/60 mb-4">{filtered.length} poster</p>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Identifierare</th>
                  <th>Titel (SV)</th>
                  <th>Titel (EN)</th>
                  <th>HP</th>
                  <th>Nivå</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((info) => (
                  <tr
                    key={info.identifier || info.id}
                    className="hover cursor-pointer"
                    onClick={() => setSelectedInfo(info)}
                  >
                    <td className="font-mono text-sm">{info.identifier || '-'}</td>
                    <td>{info.titleSwe || '-'}</td>
                    <td>{info.titleEng || '-'}</td>
                    <td>{info.credits ?? '-'}</td>
                    <td>{info.educationLevelCode || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-base-content/60">
              Ingen data hittades
            </div>
          )}
        </>
      )}

      {selectedInfo && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedInfo(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              {selectedInfo.titleSwe || selectedInfo.identifier}
            </h2>
            <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(selectedInfo, null, 2)}
            </pre>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedInfo(null)}>Stäng</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedInfo(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
