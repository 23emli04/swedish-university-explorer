export default function EventDetailDialog({ event, onClose }) {
  if (!event) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const fields = [
    { label: 'Identifierare', value: event.identifier },
    { label: 'Svensk titel', value: event.titleSwe },
    { label: 'Engelsk titel', value: event.titleEng },
    { label: 'Högskolepoäng', value: event.credits ? `${event.credits} hp` : null },
    { label: 'Nivå', value: event.educationLevelCode },
    { label: 'Studietakt', value: event.studyPace ? `${event.studyPace}%` : null },
    { label: 'Start', value: formatDate(event.executionStart) },
    { label: 'Slut', value: formatDate(event.executionEnd) },
    { label: 'Ansökningsfrist', value: formatDate(event.applicationDeadline) },
    { label: 'Plats', value: event.location },
    { label: 'Studieform', value: event.studyForm },
    { label: 'Lärosäte', value: event.educationProviderName },
  ];

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[80vh] overflow-y-auto">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 pr-8">
          {event.titleSwe || event.titleEng || 'Kursdetaljer'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {fields.map(({ label, value }) =>
            value ? (
              <div key={label}>
                <span className="font-semibold">{label}:</span>
                <p className="text-base-content/70">{value}</p>
              </div>
            ) : null
          )}
        </div>

        {event.description && (
          <div className="mt-4">
            <span className="font-semibold">Beskrivning:</span>
            <p className="text-base-content/70 mt-1 whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        )}

        {event.url && (
          <div className="mt-4">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Öppna på lärosätets webbplats
            </a>
          </div>
        )}

        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Stäng
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
