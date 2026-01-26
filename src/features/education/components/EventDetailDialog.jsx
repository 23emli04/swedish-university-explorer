import React from 'react';

export default function EventDetailDialog({ event, onClose }) {
  if (!event) return null;

  const data = event.fullData || {};
  const edu = data.education || {};

  // Helpers to grab Swedish content
  const description = edu.description?.find(d => d.lang === 'swe')?.content || "";
  const eligibility = edu.eligibility?.eligibilityDescription?.[0]?.find(e => e.lang === 'swe')?.content || "";
  const credits = edu.credits?.credits || 0;
  const level = edu.educationLevel?.code === 'grund' ? 'Grundnivå' : edu.educationLevel?.code;

  // Tags from text_enrichments
  const occupations = data.text_enrichments_results?.enriched_candidates?.occupations || [];
  const skills = data.text_enrichments_results?.enriched_candidates?.competencies || [];

  return (
      <div className="modal modal-open">
        <div className="modal-box max-w-4xl bg-base-100 shadow-2xl">
          <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

          <div className="flex flex-col gap-6">
            {/* Header */}
            <header>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">{credits} HP</span>
                <span className="badge badge-outline">{level}</span>
              </div>
              <h2 className="text-3xl font-extrabold">{event.title}</h2>
              <p className="text-lg text-primary font-medium mt-1">
                {data.providerSummary?.providers?.join(", ")}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <section>
                  <h3 className="text-lg font-bold border-b pb-2 mb-3">Om utbildningen</h3>
                  <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </section>

                {eligibility && (
                    <section className="bg-base-200 p-4 rounded-xl">
                      <h3 className="text-md font-bold mb-2">Behörighet</h3>
                      <p className="text-sm italic">{eligibility}</p>
                    </section>
                )}
              </div>

              {/* Sidebar / Tags */}
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50 mb-3">Yrkesroller</h3>
                  <div className="flex flex-wrap gap-2">
                    {occupations.map((job, i) => (
                        <span key={i} className="badge badge-secondary badge-outline">{job}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50 mb-3">Kompetenser</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill, i) => (
                        <span key={i} className="text-[10px] bg-base-300 px-2 py-1 rounded text-base-content/70">
                      {skill}
                    </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop" onClick={onClose}>Close</div>
      </div>
  );
}