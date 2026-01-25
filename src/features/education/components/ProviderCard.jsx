
export default function ProviderCard({ provider, onClick }) {

  return (
    <div
      className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-base-300"
      onClick={() => onClick?.(provider)}
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-4">

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">{provider.responsibleBody || 'Okänd'}</h3>
            {provider.town && (
              <p className="text-sm text-base-content/60">{provider.town}</p>
            )}
            {provider.bodyType && (
              <span className="badge badge-outline badge-sm mt-1">{provider.bodyType}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
