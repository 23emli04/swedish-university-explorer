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
          className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-400 cursor-pointer h-full overflow-hidden"
      >
        <div className="p-6 h-full">
          {/* Provider Badge */}
          <div className="mb-4 ">
          <span className=" py-1.5 rounded-full text-md font-bold ">
            {providers}
          </span>
          </div>

          {/* Title & Credits Section */}
          <div className="flex-grow mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2  transition-colors duration-200 line-clamp-2">
              {title}
            </h3>

            {points && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <span className="font-semibold text-blue-600">{points} {system}</span>
                  </div>
                </div>
            )}
          </div>

          {/* Dates Section */}
          <div className="space-y-3 mb-4">
            {hasExecutions ? (
                executions.map((exec, index) => (
                    <div
                        key={index}
                        className=" rounded-lg  "
                    >
                      <div className="text-xs font-semibold text-gray-600 mb-1.5">
                        {executions.length > 1 ? `Period ${index + 1}` : "Period"}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">
                      {new Date(exec.start).toLocaleDateString("sv-SE")}
                    </span>
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">
                      {new Date(exec.end).toLocaleDateString("sv-SE")}
                    </span>
                        </div>
                      </div>
                    </div>
                ))
            ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-amber-800 font-medium">
                Ingen schemalagd period
              </span>
                </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
              <span className="font-semibold text-sm">Läs mer</span>
              <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
  );
}