export default function EventCard({ event, onClick }) {
  // 1. Determine the source of truth for the data
  // We prefer the parsed fullData, but fallback to top-level event properties
  let fullData = {};
  try {
    fullData = typeof event.rawJson === 'string'
        ? JSON.parse(event.rawJson)
        : (event.rawJson || {});
  } catch (e) {
    console.error("Failed to parse rawJson for event:", event.id, e);
  }

  // 2. Safely extract localized values
  // These paths match common Swedish JobEd/Education API structures
  const title = event.title || fullData?.title || "Namnlös utbildning";
  const provider = event.providerName || fullData?.education_provider_name || "Okänd anordnare";

  // Digging for town name in the locations array
  const town = fullData?.events?.[0]?.locations?.[0]?.town_name
      || event.location
      || "Distans / Flera orter";

  return (
      <div
          onClick={() => onClick(event)}
          className="card bg-base-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-200 border border-base-300 group"
      >
        <div className="card-body p-5">
          {/* Category/Provider Tag */}
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-primary opacity-80">
              {provider}
            </span>
          </div>

          {/* Title */}
          <h2 className="card-title text-base font-bold leading-tight group-hover:text-primary transition-colors">
            {title}
          </h2>

          {/* Metadata */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm opacity-70 flex items-center gap-2">
              <span className="text-base-content/50">📍</span>
              {town}
            </p>
          </div>

          {/* Actions */}
          <div className="card-actions justify-end mt-4 pt-2 border-t border-base-200">
            <button className="btn btn-primary btn-sm btn-ghost group-hover:btn-outline border-none">
              Visa detaljer
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
  );
}