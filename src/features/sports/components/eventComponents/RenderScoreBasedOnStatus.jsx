export default function RenderScoreBasedOnStatus({ event }) {
    if (!event) return null;

    switch (event.status) {
        case "FINISHED":
            return (
                <p className="text-6xl text-center mx-auto font-bold whitespace-nowrap">
                    {event.homeTeamScore} - {event.visitingTeamScore}
                </p>
            );

        case "ONGOING":
            return <p className="text-xl font-bold items-center text-center justify-center">Matchen spelas<span className="loading text-center loading-dots loading-md"></span></p>;

        case "UPCOMING":
            return (
                <p className="text-2xl font-bold text-center mx-auto">
                    {new Date(event.startDate).toLocaleString("sv-SE", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Europe/Stockholm",
                    })}
                </p>
            );

        default:
            return null;
    }
}
