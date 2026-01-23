import React from "react";
import {useNavigate} from "react-router-dom";

export default function StandingsTable({
                                           leagues = [],
                                           loading = false,
                                           error = null,
                                           currentTeamId = null
                                       }) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="p-4 max-w-4xl mx-auto space-y-2">
                {Array.from({length: 10}).map((_, idx) => (
                    <div key={idx} className="skeleton h-12 w-full rounded-md"></div>
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center p-4">{error}</p>;
    }

    if (!leagues.length) {
        return <p className="text-gray-500 text-center p-4">Inga tabeller tillgängliga</p>;
    }

    return (
        <div className="space-y-8">
            {leagues.map((league, i) => (
                <div key={league.id ?? `league-${i}`} className="overflow-x-auto rounded-lg shadow p-2">
                    <table className="table table-zebra w-full">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Lag</th>
                            <th>M</th>
                            <th>V</th>
                            <th>O</th>
                            <th>F</th>
                            <th>GM</th>
                            <th>IM</th>
                            <th>+/-</th>
                            <th>P</th>
                        </tr>
                        </thead>
                        <tbody>
                        {league.standings.map((teamEntry, idx) => {
                            const isCurrentTeam = currentTeamId === teamEntry.team?.id;
                            const stats =
                                teamEntry.stats?.reduce((acc, s) => {
                                    acc[s.name] = s.value;
                                    return acc;
                                }, {}) || {};

                            const borderClass =
                                teamEntry.lineThicknessBelow === 1
                                    ? "border-b-2 border-current"
                                    : teamEntry.lineThicknessBelow === 2
                                        ? "border-b-4 border-current"
                                        : "";

                            return (
                                <tr
                                    key={`${league.id}-${teamEntry.team?.id ?? idx}`}
                                    className={`cursor-pointer hover:bg-base-200 ${
                                        isCurrentTeam ? "text-warning" : ""
                                    } ${borderClass}`}
                                    onClick={() => navigate(`/team/${teamEntry.team.id}`)}
                                >
                                    <td>{teamEntry.position}</td>
                                    <td className="flex items-center gap-2">
                                        {teamEntry.team?.logo && (
                                            <img
                                                src={teamEntry.team.logo}
                                                alt={teamEntry.team.name}
                                                className="w-6 h-6 object-contain"
                                            />
                                        )}
                                        <span className="table-pin-cols">{teamEntry.team?.name}</span>
                                    </td>
                                    <td>{stats.gp ?? "-"}</td>
                                    <td>{stats.w ?? "-"}</td>
                                    <td>{stats.d ?? "-"}</td>
                                    <td>{stats.l ?? "-"}</td>
                                    <td>{stats.gf ?? "-"}</td>
                                    <td>{stats.ga ?? "-"}</td>
                                    <td>{stats.gd ?? "-"}</td>
                                    <td>{stats.pts ?? "-"}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
