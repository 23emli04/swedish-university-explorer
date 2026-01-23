import IconFactory from "../icons etc/IconFactory.jsx";
import renderEventLabel from "./RenderEventLabel.jsx";

export default function EventTimeline({ event }) {


    const gameEvents = (event.gameEvents ?? []).slice().sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0));
    return (
        <div className="p-4">

            {gameEvents.length === 0 ? (
                <p className="text-center text-gray-500">Inga registrerade matchhändelser</p>
            ) : (
                <>

                <ul className="timeline timeline-vertical ">
                    <IconFactory className={"w-5 h-5 text-center mx-auto"} name = "wistle"/>
                    <span className="text-center mx-auto text-gray-600 text-sm">Matchstart</span>
                    {gameEvents.map((ev, i) => {
                        const isHomeTeam = ev.team?.id === event.homeTeam.id;
                        const teamLogo = ev.team?.logo ?? (isHomeTeam ? event.homeTeam.logo : event.visitingTeam.logo);
                        const teamName = ev.team?.name ?? (isHomeTeam ? event.homeTeam.name : event.visitingTeam.name);

                        return (
                            <li key={i}>
                                {i !== 0 && <hr />}
                                {/* Flip the row based on home/away */}
                                <div className={`timeline-box ${isHomeTeam ? "timeline-start" : "timeline-end"} bg-base-200 shadow-md w-full`}>
                                    <div className={`flex ${isHomeTeam ? "flex-row-reverse" : "flex-row"} items-end text-md text-gray-600 `}>{ev?.minute ? `${ev.minute}'` : ""}</div>
                                    <div className={`flex ${isHomeTeam ? "flex-row" : "flex-row-reverse"} items-center gap-2`}>
                                        <img src={teamLogo} alt={teamName} className="w-8 h-8 object-contain" />

                                        <div className="flex flex-col">

                                            {renderEventLabel(ev, isHomeTeam)}
                                            <p className="text-xs text-center text-gray-500 mt-1">{teamName}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </li>
                        );
                    })}
                </ul>
                </>
            )}
        </div>
    );
}
