import { useState } from 'react';

export default function ProviderCard({ provider, onClick }) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div
      className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-base-300"
      onClick={() => onClick?.(provider)}
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          {provider.logoUrl && !imgError ? (
            <img
              src={provider.logoUrl}
              alt={provider.name}
              className="w-12 h-12 object-contain rounded"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary font-bold text-lg">
              {provider.name?.charAt(0) || '?'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">{provider.name || 'Okänd'}</h3>
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
