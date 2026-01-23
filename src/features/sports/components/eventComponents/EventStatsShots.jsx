import IconFactory from "../icons etc/IconFactory.jsx";

export default function EventStatsShots({event}) {
    if (!event?.facts?.shots) return (
        <ul className="flex flex-col items-center justify-center space-y-4 p-4 list-none">
            <li className="flex items-center gap-2">
                <IconFactory name="arena" className="h-8 w-8"/>
                <span>{event.facts?.arena?.name ?? "Ej registrerat"}</span>
            </li>

            <li className="flex items-center gap-2">
                <IconFactory name="åskådare" className="h-8 w-8"/>
                <span>Åskådare: {event.facts?.spectators ?? "Ej registrerat"}</span>
            </li>
            <li className="flex items-center text-md gap-2">
                <IconFactory name="Ref" className="h-8 w-8"/>
                <span>
                 Domare:{" "}
                    {event.facts?.referees?.length
                        ? event.facts.referees.join(", ")
                        : "Ej registrerat"}
                 </span>
            </li>

        </ul>

    );

    //Lite specifikt för hockeyn

    const totalMatch = event.facts.shots.match(/^(\d+)-(\d+)/);
    if (!totalMatch) return null;

    const home = parseInt(totalMatch[1]);
    const away = parseInt(totalMatch[2]);
    const total = Math.max(home + away, 1);
    const homePercent = (home / total) * 100;
    const awayPercent = (away / total) * 100;

    return (
        <ul className="flex flex-col items-center justify-center space-y-4 p-4 list-none">
            <li className="flex flex-col items-center w-full">
                <span className="text-sm font-semibold mb-1">Skott</span>

                <div className="flex items-center w-full max-w-md gap-2">
                    <span className="w-8 text-right text-sm font-medium">{home}</span>

                    <div className="relative flex-1 h-3 rounded-full bg-base-300 overflow-hidden">
                        <div
                            className="absolute left-0 top-0 h-full bg-info"
                            style={{width: `${homePercent}%`}}
                        ></div>
                        <div
                            className="absolute right-0 top-0 h-full bg-error"
                            style={{width: `${awayPercent}%`}}
                        ></div>
                    </div>

                    <span className="w-8 text-left text-sm font-medium">{away}</span>
                </div>
            </li>

            <li className="flex items-center gap-2">
                <IconFactory name="arena" className="h-6 w-6"/>
                <span>Arena: {event.facts?.arena?.name ?? "Okänd"}</span>
            </li>

            <li className="flex items-center gap-2">
                <IconFactory name="åskådare" className="h-6 w-6"/>
                <span>Åskådare: {event.facts?.spectators ?? "Ej rapporterat"}</span>
            </li>
            <li className="flex items-center text-md text-gray-600 gap-2">
                <IconFactory name="Referee" className="h-6 w-6"/>
                <span>Domare: {event.facts?.referees ?? "Ej rapporterad"}</span>
            </li>
        </ul>
    );
}