import {useState, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import IconFactory from "../icons etc/IconFactory.jsx";
import {useAllTeams} from "../../hooks/TeamHooks.jsx";
import {useAllLeagues} from "../../hooks/LeagueHooks.jsx";
import formatLeaguePath from "../formatLeaguePath.jsx";

export default function SearchComponent() {
    const {
        data: teamData, loading: teamsLoading, error: teamsError,
    } = useAllTeams();
    const currentTeams = teamData.filter((t) => t?.sport.name !== "Bowling");
    const currentYear = new Date().getFullYear();

    const {
        data: leagueData, loading: leaguesLoading, error: leaguesError,
    } = useAllLeagues();
    const leagueCurrentYear = leagueData.filter((l) => l?.season.startYear === currentYear && l?.sport.name !== "Bowling");

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const loading = teamsLoading || leaguesLoading;
    const error = teamsError || leaguesError;

    const results = useMemo(() => {
        if (!query.trim()) return {teams: [], leagues: []};
        const lower = query.toLowerCase();

        const filteredTeams = currentTeams.filter((t) => t.name?.toLowerCase().includes(lower));

        const filteredLeagues = leagueCurrentYear.filter((l) => l.name?.toLowerCase().includes(lower));

        return {teams: filteredTeams, leagues: filteredLeagues};
    }, [query, teamData, leagueData]);

    const handleSelectTeam = (id) => {
        setQuery("");
        document.getElementById("searchModal").close();
        navigate(`/team/${id}`);
    };

    const handleSelectLeague = (league) => {
        setQuery("")
        document.getElementById("searchModal").close();
        navigate(`/league/${formatLeaguePath(league.name)}/${league.teamClass.toLowerCase()}`);
    }
    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Search input */}
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    placeholder="Sök lag eller liga..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                />
            </label>

            {/* Results dropdown */}
            {query.length >= 2 && (
                <div className="absolute mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg w-full z-50">
                    {loading && (<div className="p-2 text-sm text-center text-gray-500">
                        Laddar resultat...
                        <span className="loading loading-dots loading-xs ml-1"/>
                    </div>)}

                    {error && (<div className="p-2 text-sm text-red-500">
                        {error || "Kunde inte hämta data"}
                    </div>)}

                    {!loading && !error && results.teams.length === 0 && results.leagues.length === 0 && (
                        <div className="p-2 text-sm text-gray-500">
                            Inga resultat hittades
                        </div>)}

                    {!loading && !error && (<ul className="max-h-60 overflow-y-auto divide-y divide-base-300">
                        {/* Leagues */}
                        {results.leagues.length > 0 && (<>
                            <li className="px-3 py-1 text-xs font-bold text-gray-500">
                                Ligor
                            </li>
                            {results.leagues.map((league) => (
                                <li
                                    key={`league-${league.id}`}
                                    onClick={() => handleSelectLeague(league)}
                                    className="p-2 flex items-center gap-2 hover:bg-base-200 cursor-pointer transition-colors"
                                >
                                    <IconFactory name={league.sport.name} className="h-5 w-5"/>
                                    <span>{league.name} {league.name.includes("Superligan") ?
                                        (league.teamClass.includes("WOMEN") ? "(Dam)" : "(Herr)") : ""}
                                    </span>
                                </li>))}
                        </>)}
                        {results.teams.length > 0 && (<>
                            <li className="px-3 py-1 text-xs font-bold text-gray-500">
                                Lag
                            </li>
                            {results.teams.map((team) => (
                                <li
                                    key={`team-${team.id}`}
                                    onClick={() => handleSelectTeam(team.id)}
                                    className="p-2 flex items-center gap-2 hover:bg-base-200 cursor-pointer transition-colors"
                                >
                                    {team.logo && (<img
                                        src={team.logo}
                                        alt={team.name}
                                        className="w-6 h-6 object-contain"
                                    />)}
                                    <span>{team.name}{" "}
                                        <span className="text-gray-500 text-xs">
                                        ({team.teamClass === "MEN" ? "Herr" : "Dam"}){" "}
                                    </span>
                                    <span className="text-gray-200 text-xs">
                                        {team.sport.name}
                                    </span>
                                </span>
                                </li>))}
                        </>)}
                    </ul>)}
                </div>)}
        </div>);
}
