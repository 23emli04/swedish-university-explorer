import {useLeagueAllSeasonsById} from "../../hooks/LeagueHooks.jsx";
import {useEffect, useRef} from "react";

export default function SeasonSelector({leagueId, setLeagueId}) {
    const {data: seasonData, loading, err} = useLeagueAllSeasonsById(leagueId);
    const seasons = seasonData?.allSeasons || [];
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                dropdownRef.current.removeAttribute("open");
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);


    if (loading) return <span className="loading loading-dots loading-sm text-warning my-2 "></span>;
    if (err) return <div className="text-red-500">Fel ladda säsonger</div>;
    if (!seasons.length) return <div>Inga säsonger tillgängliga</div>;

    const currentSeason = seasons.find(s => s.id === leagueId)?.slug || seasons[0].slug;

    return (
        <div className="my-2">
            <span className="md:hidden text-sm font-bold">Välj säsong:</span>
            <details ref={dropdownRef} className="dropdown dropdown-center md:hidden">

                <summary className="btn m-3 btn-outline px-8">{currentSeason}
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                         className="-mr-1 size-5 text-gray-400">
                        <path
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            />
                    </svg>
                </summary>
                <ul className="menu dropdown-content bg-base-200 shadow-sm w-52 p-2 ">
                    {seasons.map(season => (
                        <li key={season.id}>
                            <button
                                className={`tab ${leagueId === season.id ? "tab-active text-warning" : ""}`}
                                onClick={() => setLeagueId(season.id)}
                            >
                                {season.slug}
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
                        onClick={() => {
                            setLeagueId(season.id);
                        }}>
                        {season.slug}
                    </button>
                ))}
            </div>
        </div>
    );
}
