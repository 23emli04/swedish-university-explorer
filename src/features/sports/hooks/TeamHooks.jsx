import { SportsApi } from "../api.jsx";
import { delay, MOCK, pickList, USE_MOCK } from "../MockData.js";
import useFetchApi from "./GenericDataFetchHook.jsx";


export function useTeamId(id) {
    return useFetchApi(
        async () => {
            if (USE_MOCK) {
                await delay(150);
                return MOCK.teams?.find(t => t.id === id) || null;
            } else {
                return await SportsApi.teamById(id);
            }
        },
        [id],
        null
    );
}

export function useTeamStandings(teamId) {
    return useFetchApi(
        async () => {
            if (!teamId) return [];

            let res;
            if (USE_MOCK) {
                await delay(150);
                res = MOCK.standings;
            } else {
                res = await SportsApi.teamStandings(teamId);
            }

            const leagues = res.data?.leagues || res.leagues || [];
            return leagues.map(league => {
                const standingsArray = [];
                (league.groups || []).forEach(group => {
                    if (Array.isArray(group.standings)) {
                        standingsArray.push(...group.standings);
                    }
                });
                return { ...league, standings: standingsArray };
            });
        },
        [teamId],
        []
    );
}

export function useTeamEvents(teamId, status) {
    return useFetchApi(
        async () => {
            if (USE_MOCK) {
                await delay(150);
                return MOCK.sports;
            } else {
                const res = await SportsApi.eventsByTeam(teamId, status);
                return pickList(res, "events");
            }
        },
        [teamId, status],
        []
    );
}

export function useAllTeams() {
    return useFetchApi(
        async () => {
            if (USE_MOCK) {
                await delay(150);
                return MOCK.sports;
            } else {
                const res = await SportsApi.allTeams();
                return pickList(res, "teams");
            }
        },
        [],
        []
    );
}

export function useLeaguesBySportAndGender(sportId, gender) {
    return useFetchApi(
        async () => {
            if (USE_MOCK) {
                await delay(150);
                return MOCK.sports;
            } else {
                const res = await SportsApi.allLeaguesBySportAndGender(sportId, gender);
                return pickList(res, "leagues");
            }
        },
        [sportId, gender],
        []
    );
}
