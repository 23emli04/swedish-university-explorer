export default function ProviderDetailDialog({ provider, onClose }) {
  if (!provider) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex items-center gap-4 mb-6">
          {provider.logoUrl ? (
            <img
              src={provider.logoUrl}
              alt={provider.name}
              className="w-16 h-16 object-contain rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center text-primary font-bold text-2xl">
              {provider.name?.charAt(0) || '?'}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">{provider.name}</h2>
            {provider.town && <p className="text-base-content/60">{provider.town}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {provider.identifier && (
            <div>
              <span className="font-semibold">Identifierare:</span>
              <p className="text-base-content/70">{provider.identifier}</p>
            </div>
          )}
          {provider.bodyType && (
            <div>
              <span className="font-semibold">Typ:</span>
              <p className="text-base-content/70">{provider.bodyType}</p>
            </div>
          )}
          {provider.url && (
            <div className="col-span-2">
              <span className="font-semibold">Webbplats:</span>
              <p>
                <a
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  {provider.url}
                </a>
              </p>
            </div>
          )}
        </div>

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
