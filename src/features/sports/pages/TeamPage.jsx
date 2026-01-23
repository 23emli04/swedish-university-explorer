import {useNavigate, useParams} from "react-router-dom";
import {useTeamEvents, useTeamId} from "../hooks/TeamHooks.jsx";
import {useEffect, useState} from "react";
import GamesTable from "../components/gamesComponents/GamesTable.jsx";
import StandingsTable from "../components/genericComponents/StandningsTable.jsx";
import IconFactory from "../components/icons etc/IconFactory.jsx";
import GamesFilter from "../components/gamesComponents/GamesFilter.jsx";
import TeamSeasonSelector from "../components/genericComponents/TeamSeasonSelector.jsx";
import {useLeagueWithTeamsById} from "../hooks/LeagueHooks.jsx";


export default function TeamPage() {
    const [status, setStatus] = useState("FINISHED")
    const [order, setOrder] = useState("desc");
    const [leagueId, setLeagueId] = useState(null);


    console.log("leagueId: ", leagueId);
    const {id} = useParams();
    const {data, loading, err} = useTeamId(id);
    const team = data?.team

    const events = useTeamEvents(id, status, order);
    const leagues = useLeagueWithTeamsById(leagueId);
    const selectedLeague = Array.isArray(leagues?.data?.groups) && leagues.data.groups.length > 0
        ? leagues.data.groups[0]
        : null;


    const navigate = useNavigate()

    useEffect(() => {
        setLeagueId(leagueId);
    }, [leagueId, setLeagueId]);


    if (loading) return (<div className="max-w-3xl mx-auto flex flex-col min-h-screen space-y-4 p-4">
            <div className="skeleton h-96 w-full rounded-lg"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
        </div>
    );
    if (err) return <p className="text-red-500">Error loading team</p>;
    if (!team) return <p>No team found</p>;

    return (
        <>
            <div className="p-4 max-w-3xl mx-auto">
                <a className="link cursor-pointer" onClick={() => navigate(-1)}>
                    Tillbaka
                </a>
                <div className="flex justify-around items-center">
                    <div className="flex flex-col items-center">
                        <img src={team.logo} className="w-30 h-30 object-contain" alt={team.name}/>
                        <span className="text-3xl font-bold text-center mb-4">{team.name}</span>
                        <span
                            className="text-xl font-bold text-center mb-4">{team.teamClass === "WOMEN" ? "Dam" : "Herr"}</span>
                        <IconFactory name="arena" className="h-8 w-8"/>
                        <span className="text-3xl font-bold text-center mb-4">{team.arena?.name ?? "Okänd"}</span>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-4 max-w-4xl px-4">

                <TeamSeasonSelector
                    sportId={team.sport.id}
                    gender={team.teamClass}
                    teamId={team.id}
                    leagueId={leagueId}
                    setLeagueId={setLeagueId}
                />

                <StandingsTable leagues={selectedLeague ? [selectedLeague] : []}
                                loading={leagues.loading}
                                error={leagues.error}
                                currentTeamId={team.id}/>

                <h2 className="text-2xl font-bold my-4 mx-2">Matcher:</h2>
                <GamesFilter
                    status={status}
                    onChangeStatus={setStatus}
                    onChangeOrder={setOrder}
                    order={order}/>

                <GamesTable
                    items={events.data}
                    loading={events.loading}
                    error={events.err}
                />
            </div>
        </>


    )

}
