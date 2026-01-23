export const RenderScoreOrTimeBasedOnEventStatus = (item) => {
    switch (item.item.status) {
        case "FINISHED":
            return <p className="text-sm font-bold">{item.item?.homeTeamScore} - {item.item?.visitingTeamScore}</p>;
        case "ONGOING":
            return <p className="text-sm font-bold">Matchen spelas</p>;
        case "UPCOMING": {
            const date = new Date(item.item?.startDate);

            return (<>
                <div className="gap-1">

                        <span className="hidden md:inline">
                        {date.toLocaleString("sv-SE", {
                            hour: "2-digit", minute: "2-digit", timeZone: "Europe/Stockholm",
                        })}
                        </span>
                    <span className="md:hidden inline">
                          {date.toLocaleTimeString("sv-SE", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "Europe/Stockholm",
                          })}
                        </span>
                </div>
            </>);
        }
    }
};
export default RenderScoreOrTimeBasedOnEventStatus;