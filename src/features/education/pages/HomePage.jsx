import { useState, useEffect } from 'react';
import { useEducationList, useEducationSearch } from '../hooks/useEducation';
import EventCard from '../components/EventCard'; // This will render your Education
import EventDetailDialog from '../components/EventDetailDialog';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorAlert from '../components/ui/ErrorAlert';
import Pagination from '../components/Pagination';
import Hero from "../components/ui/Hero.jsx";

export default function HomePage() {
    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const [sortDirection, setSortDirection] = useState('DESC');
    const [search, setSearch] = useState('');
    const [selectedEducation, setSelectedEducation] = useState(null);


    const isSearching = search.trim().length >= 2;

    // Pattern: Standard List
    const listQuery = useEducationList({
        page,
        size,
        sortBy: 'lastSynced', // Changed from executionStart as Education entity uses lastSynced
        sortDirection,
    });
    console.log(listQuery);

    // Pattern: Search List
    const searchQuery = useEducationSearch(search, { page, size });

    const query = isSearching ? searchQuery : listQuery;
    const { data, loading, error } = query;

    useEffect(() => {
        setPage(0);
    }, [search]);

    return (
        <div className="container mx-auto max-w-6xl px-4 py-6">
            <Hero onSearch={setSearch} /> {/* Ensure Hero passes search back if needed */}

            {loading && <LoadingSkeleton rows={6} />}
            {error && <ErrorAlert error={error} />}

            {!loading && !error && (
                <>
                    <p className="text-base-content/60 mb-4">
                        {data?.totalElements ?? 0} utbildningar hittades
                    </p>

                    {data?.content && data.content.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.content.map((edu) => (
                                <EventCard
                                    key={edu.id}
                                    event={edu} // Passing the Education entity as 'event' to maintain compat
                                    onClick={setSelectedEducation}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-base-content/60">
                            Inga utbildningar matchar din sökning
                        </div>
                    )}

                    <Pagination
                        page={page}
                        totalPages={data?.totalPages ?? 0}
                        onPageChange={setPage}
                    />
                </>
            )}

            <EventDetailDialog
                event={selectedEducation}
                onClose={() => setSelectedEducation(null)}
            />
        </div>
    );
}