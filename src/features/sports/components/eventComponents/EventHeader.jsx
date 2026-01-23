import { useNavigate } from "react-router-dom";
import RenderScoreBasedOnStatus from "./RenderScoreBasedOnStatus";
import formatLeaguePath from "../formatLeaguePath.jsx";

export default function EventHeader({ event }) {
    const navigate = useNavigate();

    return (
        <div>
            <a className="link cursor-pointer mx-auto" onClick={() => navigate(-1)}>Tillbaka</a>
            <h1 className="text-3xl font-bold text-center mt-2 mb-4">
                {event.homeTeam.name} vs {event.visitingTeam.name}
            </h1>
            <p className="text-center text-lg mb-2 cursor-pointer" onClick={() =>
                navigate(`/league/${formatLeaguePath(event.league.name)}/${event.league.teamClass.toLowerCase()}`)
            }>{event.league.name}</p>
            <p className="text-center text-lg mb-2">Omgång: {event.round ?? "Okänd"}</p>
            <p className="text-center text-warning mb-4">
                {new Date(event.startDate).toLocaleString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                    timeZone: "Europe/Stockholm",
                })}
            </p>
            <div className="flex justify-around items-center">
                <div
                    className="flex flex-col items-center justify-center flex-1 min-w-[100px] hover:bg-base-300 rounded-lg cursor-pointer p-2"
                    onClick={() => navigate(`/team/${event.homeTeam.id}`)}
                >
                    <img src={event.homeTeam.logo} className="w-20 h-20 object-contain" alt={event.homeTeam.name} />
                    <span>{event.homeTeam.name}</span>
                    <div className="divider divider-info"></div>
                </div>

                <RenderScoreBasedOnStatus event={event}/>

                <div
                    className="flex flex-col items-center justify-center flex-1 min-w-[100px] hover:bg-base-300 rounded-lg cursor-pointer p-2"
                    onClick={() => navigate(`/team/${event.visitingTeam.id}`)}
                >
                    <img src={event.visitingTeam.logo} className="w-20 h-20 object-contain" alt={event.visitingTeam.name} />
                    <span>{event.visitingTeam.name}</span>
                    <div className="divider divider-error"></div>
                </div>
            </div>

        </div>
    );
}
