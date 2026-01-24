import { useState } from 'react';
import { getApiBaseUrl, setApiBaseUrl } from '../../../lib/educationApi';

export default function EndpointConfigDialog({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(getApiBaseUrl());

  const handleSave = () => {
    setApiBaseUrl(url);
    setIsOpen(false);
    onSave?.();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-ghost btn-sm gap-2"
        title="Konfigurera API-endpoint"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        API
      </button>

      {isOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">API-konfiguration</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Backend-URL</span>
              </label>
              <input
                type="url"
                placeholder="http://localhost:8080"
                className="input input-bordered w-full"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Ex: http://localhost:8080 eller https://api.example.com
                </span>
              </label>
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>Avbryt</button>
              <button className="btn btn-primary" onClick={handleSave}>Spara</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
