export default function EventCard({ event, onClick }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('sv-SE');
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-base-300"
      onClick={() => onClick?.(event)}
    >
      <div className="card-body p-4">
        <h3 className="font-semibold text-base line-clamp-2">
          {event.titleSwe || event.titleEng || event.identifier || 'Okänd kurs'}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {event.credits && (
            <span className="badge badge-primary badge-sm">{event.credits} hp</span>
          )}
          {event.educationLevelCode && (
            <span className="badge badge-secondary badge-sm">{event.educationLevelCode}</span>
          )}
          {event.studyPace && (
            <span className="badge badge-outline badge-sm">{event.studyPace}%</span>
          )}
        </div>

        <div className="text-sm text-base-content/60 mt-2 space-y-1">
          {event.educationProviderName && (
            <p className="truncate">{event.educationProviderName}</p>
          )}
          <p>
            {formatDate(event.executionStart)} - {formatDate(event.executionEnd)}
          </p>
          {event.location && <p>{event.location}</p>}
        </div>
      </div>
    </div>
  );
}
