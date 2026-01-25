import { useParams, useNavigate } from 'react-router-dom';
import { useEducationProvider } from '../hooks/useEducationProviders';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorAlert from '../components/ui/ErrorAlert';
import ProviderDetails from '../components/ProviderDetails';

export default function ProviderSpecificPage() {
    const { id: providerId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useEducationProvider(providerId);

    if (loading) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <LoadingSkeleton rows={10} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <ErrorAlert error={error} />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
                <p className="text-xl opacity-50 font-medium">Lärosätet hittades inte</p>
                <button className="btn btn-ghost mt-4" onClick={() => navigate(-1)}>Gå tillbaka</button>
            </div>
        );
    }

    return <ProviderDetails data={data} onBack={() => navigate(-1)} />;
}