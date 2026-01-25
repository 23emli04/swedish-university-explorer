import { useState, useMemo, useEffect, useRef } from 'react';
import { useEducationByProvider } from '../hooks/useEducationProviders.jsx';
import {
    Search, BookOpen, GraduationCap, Clock,
    AlertCircle, MapPin, Calendar, Loader2
} from 'lucide-react';

export default function ProviderCourseBrowser({ providerId }) {
    // 1. Destructure infinite scroll props from your hook
    const { data: courses, loading, error, hasMore, loadMore } = useEducationByProvider(providerId);

    const [search, setSearch] = useState('');
    const observerTarget = useRef(null);

    // 2. Intersection Observer logic to trigger loadMore
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                // If the bottom div is visible AND we have more to load AND not currently loading
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the sentinel is visible
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) observer.unobserve(observerTarget.current);
        };
    }, [hasMore, loading, loadMore]);

    // 3. Filtering logic (runs on the currently accumulated 'courses' array)
    const filteredCourses = useMemo(() => {
        return (courses || []).filter(course => {
            const searchLower = search.toLowerCase();
            return (
                (course.title?.toLowerCase() || '').includes(searchLower) ||
                (course.town?.toLowerCase() || '').includes(searchLower)
            );
        });
    }, [courses, search]);

    if (error) {
        return (
            <div className="alert alert-error shadow-sm mb-4">
                <AlertCircle size={20} />
                <span>Kunde inte ladda utbildningar: {error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* SEARCH HEADER */}
            <div className="sticky top-0 z-10 bg-base-100/80 backdrop-blur-md py-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                    <input
                        type="text"
                        placeholder="Sök i utbudet (t.ex. 'projektledare' eller 'Stockholm')..."
                        className="input input-bordered w-full pl-10 h-12 shadow-sm focus:border-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {courses.length > 0 && (
                    <p className="text-xs opacity-50 mt-2 px-1">
                        Visar {filteredCourses.length} av {courses.length} laddade utbildningar
                    </p>
                )}
            </div>

            {/* COURSE LIST */}
            <div className="grid grid-cols-1 gap-4">
                {filteredCourses.map((course, index) => (
                    <div
                        key={`${course.identifier}-${index}`}
                        className="group card bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="card-body p-5 flex-row items-center gap-5">
                            {/* Icon Logic based on credits/title */}
                            <div className="p-3 rounded-xl bg-base-200 text-base-content/50 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                {parseInt(course.credits) > 100 ? <GraduationCap size={24} /> : <BookOpen size={24} />}
                            </div>

                            <div className="flex-1">
                                <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                    {course.title}
                                </h4>

                                <div className="flex flex-wrap gap-y-2 gap-x-5 text-sm opacity-70 mt-2">
                                    <span className="flex items-center gap-1.5 font-semibold text-primary">
                                        <Clock size={15} /> {course.credits || 0} hp
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={15} /> {course.town || 'Distans'}
                                    </span>
                                    {course.executionStart && (
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={15} />
                                            {new Date(course.executionStart).toLocaleDateString('sv-SE')}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Pace Badge - Hidden on mobile */}
                            <div className="hidden md:block text-right border-l pl-5 border-base-300">
                                <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Studietakt</div>
                                <div className="font-mono font-bold text-lg">{course.pacePercentage}%</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* INFINITE SCROLL SENTINEL */}
            <div
                ref={observerTarget}
                className="py-10 flex flex-col items-center justify-center gap-3"
            >
                {loading && (
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Hämtar fler utbildningar...</span>
                    </div>
                )}

                {!hasMore && courses.length > 0 && (
                    <div className="divider opacity-20 px-10">Slut på resultat</div>
                )}

                {filteredCourses.length === 0 && !loading && (
                    <div className="text-center py-10 opacity-40 italic border-2 border-dashed rounded-2xl w-full">
                        Inga resultat matchade din sökning
                    </div>
                )}
            </div>
        </div>
    );
}