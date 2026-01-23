export default function EventStatistics({event}) {

    const stats = event?.statistics;
    if (!stats) return null;


    const statsList = [{key: "ballPossession", label: "Bollinnehav - %", isPercent: true},
        {key: "shotsTotal", label: "Skott"},
        {key: "shotsOnGoal", label: "Skott på mål"},
        {key: "shotsOffGoal", label: "Skott utanför mål"},
        {key: "shotsSaved", label: "Räddade skott"},
        {key: "corners",label: "Hörnor",keyObj: "cornerKicks"},
        {key: "fouls", label: "Regelbrott"},
        {key: "throwIns", label: "Inkast"},
        {key: "injuries", label: "Skador"},];

    return (<div className="p-4 space-y-4">
            <h2 className="text-xl font-bold text-center mb-4">Matchstatistik</h2>
            <ul className="space-y-0">
                {statsList.map((stat) => {
                    const key = stat.keyObj || stat.key;

                    const home = stats[key]?.homeTeam ?? 0;
                    const away = stats[key]?.visitingTeam ?? 0;
                    const total = stat.isPercent ? 100 : home + away > 0 ? home + away : 1;

                    const homePercent = (home / total) * 100;
                    const awayPercent = (away / total) * 100;

                    return (<li key={stat.key} className="flex flex-col w-full">
                            <span className="text-sm text-center font-semibold mb-1">{stat.label}</span>
                            <div className="flex items-center gap-2">
                                <span className="w-8 text-right text-sm">{home}</span>

                                <div className="relative flex-1 h-3 rounded-full bg-base-300 overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-info"
                                        style={{width: `${homePercent}%`}}
                                    ></div>
                                    <div
                                        className="absolute right-0 top-0 h-full bg-error opacity-60"
                                        style={{width: `${awayPercent}%`}}
                                    ></div>
                                </div>
                                <span className="w-8 text-left text-sm">{away}</span>
                            </div>
                        </li>);
                })}
            </ul>
        </div>);
}
