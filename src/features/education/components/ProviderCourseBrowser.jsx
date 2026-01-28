import { useState, useMemo, useEffect } from 'react';
import { useEducationByProvider } from '../hooks/useEducationProviders.jsx';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Info, ExternalLink } from 'lucide-react';

export default function ProviderCourseBrowser({ providerId }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');

    // Backend handles filtering, so 'courses' only contains valid items
    const { courses = [], totalPages, loading, error } = useEducationByProvider(providerId, currentPage);
    useEffect(() => {
        setCurrentPage(0);
    }, [providerId]);

    const processedCourses = useMemo(() => {
        if (!courses) return [];

        // De-duplicate in case of database overlaps
        const uniqueMap = new Map();
        courses.forEach(c => uniqueMap.set(c.eventId, c));

        const list = Array.from(uniqueMap.values());

        if (!search) return list;

        const s = search.toLowerCase();
        return list.filter(c =>
            c.title?.toLowerCase().includes(s) ||
            c.town?.toLowerCase().includes(s)
        );
    }, [courses, search]);

    if (error) return <div className="alert alert-error shadow-sm">Fel: {error}</div>;

    return (
        <div className="space-y-6 min-h-[500px]">
            {/* Search Header */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input
                    className="input input-bordered w-full pl-11 h-12 shadow-sm focus:border-primary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Sök utbildning eller stad..."
                />
            </div>

            {/* List with Loading State */}
            <div className="relative">
                {loading && (
                    <div className="absolute inset-0 bg-base-100/60 flex justify-center pt-20 z-10 backdrop-blur-[1px]">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {processedCourses.length > 0 ? (
                        processedCourses.map(course => (
                            <div key={course.eventId} className="card bg-base-100 border border-base-300 hover:border-primary transition-all shadow-sm">
                                <div className="card-body p-5">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg leading-snug">{course.title}</h3>
                                            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm opacity-60 mt-1">
                                                <span className="flex items-center gap-1.5"><MapPin size={14} /> {course.town}</span>
                                                <span className="flex items-center gap-1.5"><Calendar size={14} /> Start: {course.start?.split('T')[0]}</span>
                                                <span>{course.credits} {course.form?.toLowerCase().includes('yrkes') ? 'YH-p' : 'hp'}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Link
                                                to={`/education/providers/education/${course.educationId}`}
                                                className="btn btn-ghost btn-sm border-base-300 flex-1 md:flex-none"
                                            >
                                                <Info size={16} /> Detaljer
                                            </Link>
                                            <a
                                                href={course.applyUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-primary btn-sm flex-1 md:flex-none gap-1"
                                            >
                                                Ansök <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : !loading && (
                        <div className="text-center py-20 opacity-40 italic border-2 border-dashed rounded-2xl">
                            Inga kommande utbildningar hittades.
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="join flex justify-center pt-6 border-t border-base-200">
                    <button
                        className="join-item btn btn-sm px-6"
                        disabled={currentPage === 0 || loading}
                        onClick={() => {
                            setCurrentPage(p => p - 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Föregående
                    </button>
                    <button className="join-item btn btn-sm no-animation bg-base-200/50">
                        Sida {currentPage + 1} av {totalPages}
                    </button>
                    <button
                        className="join-item btn btn-sm px-6"
                        disabled={currentPage >= totalPages - 1 || loading}
                        onClick={() => {
                            setCurrentPage(p => p + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Nästa
                    </button>
                </div>
            )}
        </div>
    );
}