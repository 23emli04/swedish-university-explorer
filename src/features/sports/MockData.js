export const USE_MOCK = (import.meta.env?.VITE_USE_MOCK ?? 'false') === 'true';

export const MOCK = {
    sports: [
        {id: 10, name: 'Fotboll'},
        {id: 2, name: 'Ishockey'},
        {id: 4, name: 'Innebandy'},
    ],
    leaguesBySport: {
        10: [
            {id: 134439, name: 'Allsvenskan', teamClass: 'MEN', sport: {id: 10, name: 'Fotboll'}, season: {startYear: 2023, endYear: 2024}},
            {id: 124439, name: 'Allsvenskan D', teamClass: 'WOMEN', sport: {id: 10, name: 'Fotboll'}, season: {startYear: 2023, endYear: 2024}}
        ],
        2: [
            {id: 125472, name: 'SHL', teamClass: 'MEN', sport: {id: 2, name: 'Ishockey'}, season: {startYear: 2023, endYear: 2024}},
            {id: 125554, name: 'SDHL', teamClass: 'WOMEN', sport: {id: 2, name: 'Ishockey'}, season: {startYear: 2023, endYear: 2024}}
        ],
    },
};

export const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export function pickList(res, field) {
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res[field])) return res[field];
    return [];
}
