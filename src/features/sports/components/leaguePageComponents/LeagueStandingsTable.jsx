import { useNavigate } from "react-router-dom";
import {
    useLeagueByIdWithEvents,
    useLeagueStandingsById,
    useTeamsByLeagueId,
    useTeamFormsByLeagueId,
} from "../../hooks/LeagueHooks.jsx";
import FormatTeamForm from "./FormatTeamForm.jsx";

const LeagueStandingsTable = ({ leagueId }) => {
    const navigate = useNavigate();

    const { data, loading, err } = useLeagueStandingsById(leagueId);

    const today = new Date();
    const laterDate = new Date(today);
    laterDate.setDate(today.getDate() + 14);
    const formatDate = (d) => d.toISOString().split("T")[0];
    const fromDate = formatDate(today);
    const toDate = formatDate(laterDate);

    const {
        data: eventsData,
        loading: eventsLoading,
        err: eventsError,
    } = useLeagueByIdWithEvents(leagueId, "UPCOMING", fromDate, toDate);

    const {
        data: teams,
        loading: teamsLoading,
        err: teamsErr,
    } = useTeamsByLeagueId(leagueId);

    const {
        data: formData = {},
        loading: formLoading,
        err: formErr,
    } = useTeamFormsByLeagueId(
        leagueId,
        Array.isArray(teams) && teams.length > 0 ? teams : null
    );

    if (loading || teamsLoading || formLoading || eventsLoading) {
        return (
            <>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full mt-2 rounded-md"></div>
                ))}
            </>
        );
    }

    if (err || teamsErr || eventsError || formErr) {
        return (
            <div className="text-error text-center">
                Kunde inte ladda ligaställningen
            </div>
        );
    }

    return (
        <div>
            <table className="hidden md:table mx-auto table-zebra w-full table-pin-cols table-pin-rows">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Lag</th>
                    <th>M</th>
                    <th>V</th>
                    <th>O</th>
                    <th>F</th>
                    <th>GM</th>
                    <th>IM</th>
                    <th>+/-</th>
                    <th>TP</th>
                    <th>Form</th>
                    <th>Nästa</th>
                </tr>
                </thead>
                <tbody>
                {data.map((teamItem) => {
                    const teamId = teamItem.team.id;
                    const form = formData?.[teamId] || [];

                    const teamEvents =
                        eventsData?.filter(
                            (ev) =>
                                ev.homeTeam?.id === teamId || ev.visitingTeam?.id === teamId
                        ) || [];

                    const nextMatch = teamEvents.find((ev) => ev.status === "UPCOMING");

                    const opponent = nextMatch
                        ? nextMatch.homeTeam?.id === teamId
                            ? nextMatch.visitingTeam
                            : nextMatch.homeTeam
                        : null;

                    const nextMatchLogo = opponent?.logo ? (
                        <img
                            src={opponent.logo}
                            alt={`${opponent.name} logo`}
                            className="w-8 h-8 object-contain"
                        />
                    ) : (
                        "-"
                    );

                    return (
                        <tr
                            key={teamId}
                            className="cursor-pointer hover:bg-base-200"
                            onClick={() => navigate(`/team/${teamId}`)}
                        >
                            <td>{teamItem.position}</td>
                            <td className="flex items-center gap-4">
                                <img
                                    className="w-8 h-8 object-contain"
                                    src={teamItem.team.logo}
                                    alt={`${teamItem.team.name} logo`}
                                />
                                <span className="text-2xl">{teamItem.team.name}</span>
                            </td>
                            <td>{teamItem.stats.find((t) => t.name === "gp")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "w")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "d")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "l")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "gf")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "ga")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "gd")?.value}</td>
                            <td className="text-warning text-sm font-bold">
                                {teamItem.stats.find((t) => t.name === "pts")?.value}
                            </td>
                            <td className="text-center font-bold text-sm whitespace-nowrap">
                                {form.length > 0 ? <FormatTeamForm form={form} /> : "-"}
                            </td>
                            <td className="flex justify-center">{nextMatchLogo}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <div className="overflow-x-auto md:hidden">
                <table className="table mx-auto table-zebra w-full">
                    <thead>
                    <tr>
                        <th>Lag</th>
                        <th>M</th>
                        <th>V</th>
                        <th>O</th>
                        <th>F</th>
                        <th>TP</th>
                        <th>+/-</th>
                        <th>Nästa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((teamItem) => {
                        const teamId = teamItem.team.id;

                        const teamEvents =
                            eventsData?.filter(
                                (ev) =>
                                    ev.homeTeam?.id === teamId || ev.visitingTeam?.id === teamId
                            ) || [];

                        const nextMatch = teamEvents.find(
                            (ev) => ev.status === "UPCOMING"
                        );

                        const opponent = nextMatch
                            ? nextMatch.homeTeam?.id === teamId
                                ? nextMatch.visitingTeam
                                : nextMatch.homeTeam
                            : null;

                        const nextMatchLogo = opponent?.logo ? (
                            <img
                                src={opponent.logo}
                                alt={`${opponent.name} logo`}
                                className="w-8 h-8 object-contain"
                            />
                        ) : (
                            "-"
                        );

                        return (
                            <tr
                                key={teamId}
                                className="cursor-pointer hover:bg-base-200"
                                onClick={() => navigate(`/team/${teamId}`)}
                            >
                                <td className="flex items-center gap-4">
                                    <img
                                        className="w-8 h-8 object-contain"
                                        src={teamItem.team.logo}
                                        alt={`${teamItem.team.name} logo`}
                                    />
                                    <span>{teamItem.team.name}</span>
                                </td>
                                <td>{teamItem.stats.find((t) => t.name === "gp")?.value}</td>
                                <td>{teamItem.stats.find((t) => t.name === "w")?.value}</td>
                                <td>{teamItem.stats.find((t) => t.name === "d")?.value}</td>
                                <td>{teamItem.stats.find((t) => t.name === "l")?.value}</td>
                                <td className="text-warning text-sm font-bold">
                                    {teamItem.stats.find((t) => t.name === "pts")?.value}
                                </td>
                                <td>{teamItem.stats.find((t) => t.name === "gd")?.value}</td>
                                <td className="flex justify-center">{nextMatchLogo}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeagueStandingsTable;
