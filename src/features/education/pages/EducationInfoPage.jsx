import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, MapPin, Clock, ExternalLink, Loader2 } from 'lucide-react';

export default function EducationInfoPage() {
  const { id } = useParams(); // This matches the ":id" in your Route
  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API call (e.g., EducationInfoApi.getById)
    setLoading(true);
    fetch(`/api/education-info/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Kunde inte hitta utbildningen");
          return res.json();
        })
        .then(data => setEducation(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!education) return <div>Ingen information tillgänglig.</div>;

  return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <header className="space-y-4">
          <div className="text-sm breadcrumbs opacity-50">
            <ul>
              <li>Utbildningar</li>
              <li>{education.formType || 'Yrkeshögskola'}</li>
              <li>{education.titleSwedish}</li>
            </ul>
          </div>
          <h1 className="text-4xl font-black">{education.titleSwedish}</h1>
          <p className="text-xl opacity-70 italic">{education.titleEnglish}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="stats stats-vertical shadow border border-base-200">
            <div className="stat">
              <div className="stat-figure text-primary"><Clock size={24}/></div>
              <div className="stat-title">Omfattning</div>
              <div className="stat-value text-2xl">{education.credits} hp</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary"><GraduationCap size={24}/></div>
              <div className="stat-title">Nivå</div>
              <div className="stat-value text-lg leading-tight">{education.degree || 'Examen'}</div>
            </div>
          </div>

          {/* Description Area */}
          <div className="md:col-span-2 space-y-6">
            <section className="prose lg:prose-xl">
              <h2 className="text-2xl font-bold">Beskrivning</h2>
              <p>{education.descriptionSwedish || "Beskrivning saknas."}</p>
            </section>

            {education.subjectCode && (
                <div className="badge badge-outline gap-2">
                  Ämneskod: {education.subjectCode}
                </div>
            )}
          </div>
        </div>

        {/* If you want to show available start dates (events) on this page too */}
        <div className="bg-base-200 p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-4">Om utbildningen</h3>
          <p className="opacity-70 mb-6">
            Denna utbildning ges i formen <strong>{education.formType}</strong> och leder till en <strong>{education.degree}</strong>.
          </p>
          {/* Add a button back to the provider list or an external link */}
          <button className="btn btn-primary gap-2" onClick={() => window.history.back()}>
            Gå tillbaka
          </button>
        </div>
      </div>
  );
}