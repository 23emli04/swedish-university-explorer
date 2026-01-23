export default function GamesFilter({ status, onChangeStatus, onChangeOrder, currentSeason }) {
    const now = new Date();
    const currentYear = now.getFullYear();


    const isCurrentSeason = !currentSeason || /(^\d{4}$)|(^\d{4}[/-]\d{4}$)/.test(currentSeason)
        && currentSeason.includes(`${currentYear}`);

    const handleStatusChange = (newStatus) => {
        onChangeStatus(newStatus);
        if (newStatus === "UPCOMING") {
            onChangeOrder("asc");
        } else {
            onChangeOrder("desc");
        }
    };

    return (
        <div className="flex gap-2 my-4">
            <button
                className={`btn ${status === "FINISHED" ? "btn-warning" : "btn-outline"}`}
                onClick={() => handleStatusChange("FINISHED")}
            >
                Spelade matcher
            </button>

            <button
                className={`btn ${status === "UPCOMING" ? "btn-warning" : "btn-outline"}`}
                onClick={() => handleStatusChange("UPCOMING")}
                disabled={!isCurrentSeason}
            >
                Kommande matcher
            </button>
        </div>
    );
}
