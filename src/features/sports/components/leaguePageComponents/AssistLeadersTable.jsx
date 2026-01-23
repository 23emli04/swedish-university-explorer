import {useAssistLeadersById} from "../../hooks/LeagueHooks.jsx";
import {useNavigate} from "react-router-dom";

export default function AssistLeadersTable({leagueId}) {
    const { data, loading, err } = useAssistLeadersById(leagueId);
    const navigate = useNavigate();

    if (loading) {
        return (
            <>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full mt-2 rounded-md"></div>
                ))}
            </>
        );
    }

    if (err) {
        return (
            <div className="text-center text-red-500 my-4">
                Kunde inte ladda skytteliga
            </div>
        );
    }
    const players = data?.playerStats || data || [];

    if (!players || players.length === 0) {
        return (
            <div className="text-center text-gray-500 my-4">
                Ingen skytteliga tillgänglig.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl p-4 shadow-md">
            <table className="table table-zebra w-full text-sm sm:text-base">
                <thead className="bg-base-200 text-base font-semibold">
                <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Spelare</th>
                    <th className="text-left">Lag</th>
                    <th className="text-center">Assister</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                    <tr key={player.id || index} className="hover">
                        <td className="text-left">{index + 1}</td>
                        <td className="text-left font-bold">{player.name}</td>
                        <td
                            className="text-left flex items-center gap-2 hover:bg-warning cursor-pointer"
                            onClick={() => navigate(`/team/${player.team?.id}`)}
                        >
                            {player.team?.logo && (
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={player.team.logo}
                                    alt={`${player.team.name} logo`}
                                />
                            )}
                            <span>{ player.team?.name || "—"}</span>
                        </td>
                        <td className="text-center font-semibold">{player.count}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}