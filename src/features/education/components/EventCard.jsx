import { Calendar, ArrowRight, AlertCircle } from 'lucide-react';

export default function EventCard({ event, onClick }) {
  const info = event.fullData || {};

  // Basic Info
  const title = event.title || info.education?.title || "Namnlös utbildning";
  const points = info.education?.credits?.credits;
  const system = info.education?.credits?.system?.code || "";

  // Provider Logic
  const providers = Array.isArray(info.providerSummary?.providers)
    ? info.providerSummary.providers.join(", ")
    : info.providerSummary?.providers || "Information saknas";

  // Execution / Date Logic
  const executions = info.eventSummary?.executions;
  const hasExecutions = Array.isArray(executions) && executions.length > 0;

  return (
    <div
      onClick={() => onClick(event)}
      className="group card bg-base-100 border border-base-300 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
    >
      <div className="card-body p-6">
        {/* Provider Badge */}
        <div className="mb-3">
          <span className="text-sm font-bold text-base-content/70">
            {providers}
          </span>
        </div>

        {/* Title & Credits Section */}
        <div className="flex-grow mb-4">
          <h3 className="text-xl font-semibold text-base-content mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {points && (
            <div className="flex items-center gap-2 text-sm">
              <span className="badge badge-primary badge-outline">
                {points} {system}
              </span>
            </div>
          )}
        </div>

        {/* Dates Section */}
        <div className="space-y-3 mb-4">
          {hasExecutions ? (
            executions.map((exec, index) => (
              <div key={index} className="rounded-lg">
                <div className="text-xs font-semibold text-base-content/60 mb-1.5">
                  {executions.length > 1 ? `Period ${index + 1}` : "Period"}
                </div>
                <div className="flex items-center gap-3 text-sm text-base-content/80">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-success" />
                    <span className="font-medium">
                      {new Date(exec.start).toLocaleDateString("sv-SE")}
                    </span>
                  </div>
                  <span className="text-base-content/40">→</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-error" />
                    <span className="font-medium">
                      {new Date(exec.end).toLocaleDateString("sv-SE")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning py-2">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">Ingen schemalagd period</span>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-auto pt-4 border-t border-base-200">
          <div className="flex items-center justify-between text-primary group-hover:text-primary-focus transition-colors">
            <span className="font-semibold text-sm">Läs mer</span>
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}