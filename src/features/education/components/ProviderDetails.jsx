import { MapPin, Mail, Phone, Globe, Building2, Calendar, BookOpen } from 'lucide-react';
import ProviderCourseBrowser from './ProviderCourseBrowser';

export default function ProviderDetails({ data, onBack }) {
    return (
        <div className="container mx-auto max-w-5xl px-4 py-8 space-y-12">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between">
                <button className="btn btn-sm btn-outline gap-2" onClick={onBack}>
                    ← Tillbaka
                </button>
                <div className="badge badge-outline opacity-50 select-none">{data.identifier}</div>
            </div>

            {/* Hero Section */}
            <header className="border-b pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-medium mb-1 uppercase tracking-wider text-sm">
                            <Building2 size={16} />
                            {data.bodyType || 'Utbildningsanordnare'}
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tight">{data.nameSwe}</h1>
                        {data.nameEng && data.nameEng !== data.nameSwe && (
                            <p className="text-xl text-base-content/60 mt-2 italic">{data.nameEng}</p>
                        )}
                    </div>
                    {data.url && (
                        <a href={data.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                            Besök webbplats <Globe size={18} />
                        </a>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Contact & Course Browser */}
                <div className="md:col-span-2 space-y-12">

                    {/* Contact Section */}
                    <section className="card bg-base-200 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Kontaktuppgifter</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <ContactItem icon={<Mail />} label="E-post" value={data.email} isLink linkType="mailto" />
                                    <ContactItem icon={<Phone />} label="Telefon" value={data.phone} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-primary mt-1" size={20} />
                                    <div>
                                        <p className="text-xs font-bold uppercase opacity-50">Besöksadress</p>
                                        <p className="text-lg leading-snug">
                                            {data.streetVisit}<br />
                                            {data.postCodeVisit} {data.townVisit}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Education Section - New Course Browser integration */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <BookOpen className="text-primary" size={24} />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">Utbildningsutbud</h2>
                        </div>

                        {/* The logic-heavy component stays separated */}
                        <ProviderCourseBrowser providerId={data.identifier} />
                    </section>
                </div>

                {/* Right Column: Metadata / Sidebar */}
                <aside className="space-y-6">
                    <SystemInfoCard data={data} />
                </aside>
            </div>
        </div>
    );
}

// Sub-components (ContactItem, SystemInfoCard) remain same as previous step...
function ContactItem({ icon, label, value, isLink, linkType }) {
    if (!value && value !== "") return null;
    return (
        <div className="flex items-start gap-3">
            <div className="text-primary mt-1">{icon}</div>
            <div>
                <p className="text-xs font-bold uppercase opacity-50">{label}</p>
                {isLink ? (
                    <a href={`${linkType}:${value}`} className="link link-hover text-lg break-all">
                        {value || 'Saknas'}
                    </a>
                ) : (
                    <p className="text-lg">{value || 'Ej angivet'}</p>
                )}
            </div>
        </div>
    );
}

function SystemInfoCard({ data }) {
    return (
        <div className="card bg-base-300">
            <div className="card-body gap-4">
                <h3 className="font-bold text-sm uppercase opacity-60 flex items-center gap-2">
                    <Calendar size={14} /> Systeminformation
                </h3>
                <div>
                    <p className="text-xs opacity-70 italic">Senast uppdaterad</p>
                    <p className="font-mono text-sm">
                        {new Date(data.lastEdited).toLocaleDateString('sv-SE')}
                    </p>
                </div>
                {data.responsibleBody && (
                    <div>
                        <p className="text-xs opacity-70 italic">Huvudman</p>
                        <p className="text-sm font-semibold">{data.responsibleBody}</p>
                    </div>
                )}
            </div>
        </div>
    );
}