import {useState, useEffect} from "react";
import LeagueStandingsTable from "../components/leaguePageComponents/LeagueStandingsTable.jsx";
import GamesTable from "../components/gamesComponents/GamesTable.jsx";
import MatchFilter from "../components/gamesComponents/GamesFilter.jsx";
import SeasonSelector from "../components/leaguePageComponents/SeasonSelector.jsx";
import ShowDiffrentTablesSelector from "../components/leaguePageComponents/ShowDiffrentTablesSelector.jsx";

import {useLeagueAllSeasonsById, useLeagueStandingsById} from "../hooks/LeagueHooks.jsx";
import {useEventByLeagueId} from "../hooks/EventHooks.jsx";
import ScoringLeadersTable from "../components/leaguePageComponents/ScoringLeadersTable.jsx";
import AssistLeadersTable from "../components/leaguePageComponents/AssistLeadersTable.jsx";

const LeaguePage = ({initialLeagueId}) => {
    const [leagueId, setLeagueId] = useState(initialLeagueId);
    const [status, setStatus] = useState("FINISHED");
    const [order, setOrder] = useState("desc");
    const [activeTable, setActiveTable] = useState("Tabell");

    //Ser till att ligan får "standardVärden när urlen byts ut [initialLeagueID] - Emil"
    useEffect(() => {
        setLeagueId(initialLeagueId);
        setActiveTable("Tabell");
        setStatus("FINISHED");
        setOrder("desc");
    }, [initialLeagueId]);

    const {data: seasonData, loading: seasonsLoading, err: seasonsErr} = useLeagueAllSeasonsById(leagueId);
    const {data: standings, loading: standingsLoading, err: standingsErr} = useLeagueStandingsById(leagueId);
    const eventData = useEventByLeagueId(leagueId, status, order);

    const currentSeason = seasonData.allSeasons?.find(s => s.id === leagueId)?.slug || seasonData.allSeasons?.[0]?.slug;

    const renderActiveTable = () => {
        switch (activeTable) {
            case "Tabell":
                return (
                    <LeagueStandingsTable
                        standings={standings}
                        loading={standingsLoading}
                        error={standingsErr}
                        leagueId={leagueId}
                        setLeagueId={setLeagueId}
                    />
                );
            case "Skytteliga":
                return <ScoringLeadersTable leagueId={leagueId}/>;
            case "Assistliga":
                return <AssistLeadersTable leagueId={leagueId}/>;
            default:
                return (
                    <div className="text-center text-gray-500">
                        No table selected.
                    </div>
                );
        }
    };

    return (
        <div className="p-4 ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mt-4 font-bold my-4 glass p-4 sm:p-6 text-center">{seasonData.leagueName || "Laddar liga..."}</h1>
            <div className="flex flex-col text-center items-center">
                <SeasonSelector
                    allSeasons={seasonData.allSeasons}
                    leagueId={leagueId}
                    setLeagueId={setLeagueId}
                    loading={seasonsLoading}
                    error={seasonsErr}
                />

                <MatchFilter
                    status={status}
                    order={order}
                    onChangeStatus={setStatus}
                    onChangeOrder={setOrder}
                    currentSeason={currentSeason}
                />
            <GamesTable
                items={eventData.data}
                loading={eventData.loading}
                error={eventData.err}
                height="h-[35vh]"
            />
            </div>
            <div className="divider"/>
            <h1 className="custom text-2xl sm:text-3xl md:text-4xl mt-10 font-bold my-4 glass p-4 sm:p-6 text-center">
                {activeTable}: {currentSeason}
            </h1>

            <div className="container mt-4 mx-auto flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-auto flex justify-center md:block ">
                    <ShowDiffrentTablesSelector onChangeActiveTable={setActiveTable}
                                                activeTable={activeTable}/>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <div className="flex-1 overflow-x-auto">{renderActiveTable()}</div>
                </div>
            </div>
        </div>
    );
};

export default LeaguePage;
