import React, { useState, useEffect } from 'react';
import { Search, MapPin, BookOpen, Clock } from 'lucide-react';

const EducationPage = () => {
    const [educations, setEducations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Hook to fetch data from your Spring Boot Backend
    useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async (query = '') => {
        setLoading(true);
        try {
            // Replace with your actual backend endpoint
            const response = await fetch(`/api/educations?search=${query}`);
            const data = await response.json();
            setEducations(data);
        } catch (error) {
            console.error("Error fetching educations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEducations(searchTerm);
    };

    // Helper to extract Swedish title from the complex JSON
    const getSwedishTitle = (edu) => {
        const titles = edu.education?.title || [];
        const sweTitle = titles.find(t => t.lang === 'swe');
        return sweTitle ? sweTitle.content : 'Titel saknas';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Hitta din utbildning</h1>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            className="w-full p-4 pl-12 rounded-xl border-none shadow-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Sök på program, stad eller ämne..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-4 text-gray-400" size={24} />
                        <button className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Sök
                        </button>
                    </form>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {educations.map((item) => (
                            <EducationCard key={item.id} data={item} title={getSwedishTitle(item)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const EducationCard = ({ data, title }) => {
    // Extracting data points from your JobTech structure
    const description = data.education?.description?.find(d => d.lang === 'swe')?.content || '';
    const form = data.education?.education_form?.name || 'Utbildning';
    const provider = data.education_providers?.[0]?.name || 'Okänd anordnare';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
          {form}
        </span>
                <Clock className="text-gray-300" size={18} />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-4 flex items-center">
                <BookOpen size={16} className="mr-2" /> {provider}
            </p>

            <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                {description.replace(/<[^>]*>?/gm, '')} {/* Strips HTML tags */}
            </p>

            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center text-gray-400 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {data.events?.[0]?.locations?.[0]?.town_name || 'Hela landet'}
                </div>
                <button className="text-blue-600 font-medium hover:underline">Visa mer</button>
            </div>
        </div>
    );
};

export default EducationPage;