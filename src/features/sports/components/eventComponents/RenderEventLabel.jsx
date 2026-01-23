import IconFactory from "../icons etc/IconFactory.jsx";

const renderEventLabel = (ev, isHomeTeam) => {
    const rowClass = `flex items-center gap-2 ${isHomeTeam ? "flex-row text-left" : "flex-row-reverse text-right"}`;
    const playerTextAlign = isHomeTeam ? "text-left" : "text-right";

    switch (ev.type) {
        case "GOAL":
            return (
                <div className="flex flex-col">
                    <div className={`${rowClass} font-bold`}>
                        <IconFactory name="goal" className="h-6 w-6" />
                        <span> Mål {ev.count > 1 && `x${ev.count}`}</span>
                    </div>
                    <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd spelare"}</span>
                </div>
            );
        case "WARNING":
            return (
                <div className="flex flex-col">
                    <div className={`${rowClass} text-yellow-300 font-semibold`}>
                        <IconFactory name="yellow-card" className="h-6 w-6" />
                        <span>Gult kort </span>
                    </div>
                    <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd spelare"}</span>
                </div>
            );
        case "SECOND_WARNING":
            return (
                <div className="flex flex-col">
                    <div className={`${rowClass} text-red-600 font-semibold`}>
                        <IconFactory name="red-card" className="h-6 w-6" />
                        <span>Rött kort</span>
                    </div>
                    <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd spelare"}</span>
                </div>
            );
        case "SUBSTITUTION":
            return (
                <div className="flex flex-col">
                    <div className={`${rowClass} font-semibold`}>
                        <IconFactory name="substitution" className="h-6 w-6" />
                        <span>Byte </span>
                    </div>
                    <span className={`text-sm ${playerTextAlign}`}>
              In: {ev.inPlayer?.name ?? "Okänd"} <br/>
              Ut: {ev.outPlayer?.name ?? "Okänd"}
            </span>
                </div>
            );
        case "PENALTY":
            return (
                <div className="flex flex-col">
                    <div className={`${rowClass} font-semibold`}>
                        <span>Straff </span>
                    </div>
                    <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd"}</span>
                </div>
            );
        default:
            return <div className={rowClass}><span>{ev.type}</span></div>;
    }
};
export default renderEventLabel;