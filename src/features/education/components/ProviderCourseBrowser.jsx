import { useState, useMemo } from 'react';
import { useEducationByProvider } from '../hooks/useEducationProviders.jsx';
import { Search, BookOpen, GraduationCap, Clock, AlertCircle } from 'lucide-react';

export default function ProviderCourseBrowser({ providerId }) {
    const { data: courses = [], loading, error } = useEducationByProvider(providerId);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    console.log(courses)

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSearch =
                course.titleSwedish?.toLowerCase().includes(search.toLowerCase()) ||
                course.code?.toLowerCase().includes(search.toLowerCase());

            // Logic check: filtering by course form (Program vs Kurs)
            const matchesType = filterType === 'all' ||
                course.formType?.toLowerCase().includes(filterType);

            return matchesSearch && matchesType;
        });
    }, [courses, search, filterType]);

    // 1. Handle Error State (Actually used now!)
    if (error) {
        return (
            <div className="alert alert-error shadow-sm text-sm">
                <AlertCircle size={18} />
                <span>{error}. Försök ladda om sidan.</span>
            </div>
        );
    }

    // 2. Handle Loading State
    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 w-full bg-base-300 animate-pulse rounded-xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[250px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                    <input
                        type="text"
                        placeholder="Sök utbildning eller kod..."
                        className="input input-bordered w-full pl-10 h-11"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="join border border-base-300">
                    <button
                        className={`join-item btn btn-sm h-11 ${filterType === 'all' ? 'btn-active' : ''}`}
                        onClick={() => setFilterType('all')}
                    >Alla</button>
                    <button
                        className={`join-item btn btn-sm h-11 ${filterType === 'program' ? 'btn-active' : ''}`}
                        onClick={() => setFilterType('program')}
                    >Program</button>
                    <button
                        className={`join-item btn btn-sm h-11 ${filterType === 'kurs' ? 'btn-active' : ''}`}
                        onClick={() => setFilterType('kurs')}
                    >Kurser</button>
                </div>
            </div>

            {/* Result List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredCourses.map(course => (
                    <div key={course.identifier} className="group card bg-base-100 border border-base-300 hover:border-primary hover:shadow-md transition-all cursor-pointer">
                        <div className="card-body p-5 flex-row items-center gap-5">
                            <div className="p-3 rounded-xl bg-base-200 text-base-content/50 group-hover:bg-primary group-hover:text-white transition-colors">
                                {course.resultIsDegree ? <GraduationCap size={22} /> : <BookOpen size={22} />}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                                    {course.titleSwedish}
                                </h4>
                                <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm opacity-60 mt-1">
                                    <span className="flex items-center gap-1 font-medium italic">
                                        <Clock size={14} /> {course.credits || 0} hp
                                    </span>
                                    <span className="font-mono">Kod: {course.code}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && !loading && (
                <div className="text-center py-16 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
                    <p className="opacity-40 font-medium italic">Inga utbildningar matchade din sökning</p>
                </div>
            )}
        </div>
    );
}