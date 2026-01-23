import { useLeaguesBySportAndGender } from "../../hooks/TeamHooks.jsx";
import { useEffect, useMemo, useState, useRef } from "react";

export default function TeamSeasonSelector({ sportId, gender, teamId, leagueId, setLeagueId }) {
    const [initialized, setInitialized] = useState(false);
    const detailsRef = useRef(null);

    const { data: seasonData, loading, err } = useLeaguesBySportAndGender(sportId, gender);

    const seasons = useMemo(() => {
        return (
            seasonData
                ?.filter(season => season.teams?.some(team => team.id === teamId))
                .filter(season => !season.name?.toLowerCase().includes("final"))
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) || []
        );
    }, [seasonData, teamId]);

    useEffect(() => {
        if (seasons.length && !initialized) {
            const hasCurrent = seasons.some(s => s.id === leagueId);
            if (!hasCurrent) {
                setLeagueId(seasons[0]?.id);
            }
            setInitialized(true);
        }
    }, [seasons, initialized, setLeagueId, leagueId]);
    //Hantera att stänga details
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                detailsRef.current.removeAttribute("open");
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    if (loading) return <span className="loading loading-dots loading-sm text-warning my-2 "></span>;
    if (err) return <div className="text-red-500">Fel ladda säsonger</div>;
    if (!seasons.length) return <div>Inga säsonger tillgängliga</div>;

    const currentSeason = seasons.find(s => s.id === leagueId)?.season.slug || seasons[0].season.slug;

    return (
        <div className="my-2">
            <span className="md:hidden text-sm font-bold">Välj säsong:</span>
            <details ref={detailsRef} className="dropdown md:hidden">
                <summary className="btn m-1">{currentSeason}
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                         className="-mr-1 size-5 text-gray-400">
                        <path
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            />
                    </svg>
                </summary>
                <ul className="menu dropdown-content bg-base-100 shadow-sm w-52 p-2">
                    {seasons.map(season => (
                        <li key={season.id}>
                            <button
                                className={`tab ${leagueId === season.id ? "tab-active text-warning" : ""}`}
                                onClick={() => {
                                    setLeagueId(season.id);
                                    detailsRef.current?.removeAttribute("open");
                                }}
                            >
                                {season.season.slug} {season.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </details>

            <div role="tablist" className="hidden md:tabs md:tabs-border">
                {seasons.map(season => (
                    <button
                        role="tab"
                        key={season.id}
                        className={`tab ${leagueId === season.id ? "tab-active text-warning" : ""}`}
                        onClick={() => setLeagueId(season.id)}
                    >
                        {season.season.slug} {season.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
