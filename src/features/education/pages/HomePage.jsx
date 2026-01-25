import { useState } from 'react';
import { useEducationEvents, useEventSearch } from '../hooks/useEducationEvents';
import EventCard from '../components/EventCard';
import EventDetailDialog from '../components/EventDetailDialog';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorAlert from '../components/ui/ErrorAlert';
import Pagination from '../components/Pagination';
import EndpointConfigDialog from '../components/ui/EndpointConfigDialog';

export default function HomePage() {
    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const [sortDirection, setSortDirection] = useState('DESC');
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const isSearching = search.trim().length >= 2;

    const eventsQuery = useEducationEvents({
        page,
        size,
        sortBy: 'executionStart',
        sortDirection,
    });

    const searchQuery = useEventSearch(search, { page, size });

    const { data, loading, error} = isSearching ? searchQuery : eventsQuery;

    const handleRefetch = () => {
        if (!isSearching && eventsQuery.refetch) {
            eventsQuery.refetch();
        }
    };
    console.log(eventsQuery)
    return (
        <div className="container mx-auto max-w-6xl px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">Utbildningar</h1>
                <EndpointConfigDialog onSave={handleRefetch} />
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Sök utbildning..."
                    className="input input-bordered flex-1 min-w-[200px]"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                />
                <select
                    className="select select-bordered"
                    value={sortDirection}
                    onChange={(e) => {
                        setSortDirection(e.target.value);
                        setPage(0);
                    }}
                >
                    <option value="DESC">Nyaste först</option>
                    <option value="ASC">Äldsta först</option>
                </select>
                <button className="btn btn-ghost" onClick={handleRefetch} title="Ladda om">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {loading && <LoadingSkeleton rows={6} />}
            {error && <ErrorAlert error={error} onRetry={handleRefetch} />}

            {!loading && !error && (
                <>
                    <p className="text-base-content/60 mb-4">
                        {data.totalElements ?? data.content?.length ?? 0} utbildningar
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(data.content || []).map((event) => (
                            <EventCard
                                key={event.identifier || event.id}
                                event={event}
                                onClick={setSelectedEvent}
                            />
                        ))}
                    </div>
                    {(!data.content || data.content.length === 0) && (
                        <div className="text-center py-12 text-base-content/60">
                            Inga utbildningar hittades
                        </div>
                    )}
                    <Pagination
                        page={page}
                        totalPages={data.totalPages || 0}
                        onPageChange={setPage}
                    />
                </>
            )}

            <EventDetailDialog
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </div>
    );
}
