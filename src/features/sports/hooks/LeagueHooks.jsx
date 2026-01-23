import useFetchApi from "./GenericDataFetchHook.jsx";
import { SportsApi } from "../api.jsx";
import { USE_MOCK, MOCK, delay, pickList } from "../MockData.js";

export function useLeaguesWithSportIdAndQuery(sportId, query) {
    return useFetchApi(async () => {
        if (!sportId) throw new Error("Missing sportId");

        if (USE_MOCK) {
            await delay(150);
            return MOCK.leaguesBySport[sportId] ?? [];
        }

        const res = await SportsApi.leaguesBySport(sportId, query);
        return pickList(res, "leagues");
    }, [sportId, query]);
}

export function useAllLeagues() {
    return useFetchApi(async () => {
        if (USE_MOCK) {
            await delay(150);
            return MOCK.allLeagues;
        }
        const res = await SportsApi.allLeagues();
        return pickList(res, "leagues");
    }, []);
}

export function useLeagueStandingsById(leagueId) {
    return useFetchApi(async () => {
        if (!leagueId) throw new Error("No leagueId provided");

        const res = await SportsApi.leagueStandingsById(leagueId);
        return res?.groups?.[0]?.standings ?? [];
    }, [leagueId]);
}


export function useScoringLeadersById(leagueId) {
    return useFetchApi(async () => {
        if (!leagueId) throw new Error("No leagueId provided");

        const res = await SportsApi.leagueScoringLeadersById(leagueId);
        if (Array.isArray(res)) return res;
        if (res?.playerStats) return res.playerStats;
        if (res?.data) return res.data;
        return [];
    }, [leagueId]);
}


export function useAssistLeadersById(leagueId) {
    return useFetchApi(async () => {
        if (!leagueId) throw new Error("No leagueId provided");

        const res = await SportsApi.leagueAssistLeadersById(leagueId);
        if (Array.isArray(res)) return res;
        if (res?.playerStats) return res.playerStats;
        if (res?.data) return res.data;
        return [];
    }, [leagueId]);
}
export function useTeamsByLeagueId(leagueId) {
    return useFetchApi(async () => {
        if (!leagueId) throw new Error("No leagueId provided");

        const res = await SportsApi.teamsByLeagueId(leagueId);
        return res?.teams || res || [];
    }, [leagueId]);
}

export function useLeagueByIdWithEvents(
    leagueId,
    status = "ALL",
    fromDate,
    toDate
) {
    return useFetchApi(async () => {
        if (!leagueId) throw new Error("No leagueId provided");

        const res = await SportsApi.leagueByIdWithEvents(
            leagueId,
            status,
            fromDate,
            toDate
        );

        return res?.events || res?.data || [];
    }, [leagueId, status, fromDate, toDate]);
}

export function useLeagueWithTeamsById(leagueId) {
    return useFetchApi(async () => {
        if (!leagueId) throw new Error("No leagueId provided");

        const res = await SportsApi.leagueWithTeamsById(leagueId);
        return res;
    }, [leagueId]);
}

export function useLeagueAllSeasonsById(leagueId) {
    return useFetchApi(async () => {
        if (!leagueId) throw new Error("No leagueId provided");

        const res = await SportsApi.leagueAllSeasonsById(leagueId);
        const leaguesArray = res.leagues || [];

        const leagueName = leaguesArray[0]?.name || "Okänd liga";
        const allSeasons = leaguesArray.map((l) => ({
            id: l.id,
            slug: l.season?.slug,
            startDate: l.season?.startDate,
            endDate: l.season?.endDate,
        }));

        return { leagueName, allSeasons };
    }, [leagueId]);
}
export function useTeamFormsByLeagueId(leagueId, teams) {
    return useFetchApi(async () => {
        if (!leagueId || !teams?.length)
            throw new Error("Missing leagueId or team list");

        const results = await Promise.all(
            teams.map(async (team) => {
                const teamId = team.id;
                const res = await SportsApi.leagueByIdLastFiveGames(
                    leagueId,
                    "FINISHED",
                    teamId
                );

                const matches = res?.events || [];
                const sorted = matches
                    .filter((ev) => ev.status === "FINISHED")
                    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                    .slice(0, 5);

                const form = sorted.map((ev) => {
                    const isHome = ev.homeTeam?.id === teamId;
                    const homeScore = ev.homeTeamScore ?? 0;
                    const awayScore = ev.visitingTeamScore ?? 0;

                    if (homeScore === awayScore) return "O";
                    if ((isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore))
                        return "V";
                    return "F";
                });

                return { teamId, form };
            })
        );

        return Object.fromEntries(results.map((r) => [r.teamId, r.form]));
    }, [leagueId, teams]);
}

