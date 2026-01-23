import IconFactory from "../icons etc/IconFactory.jsx";
import {useNavigate} from "react-router-dom";
import RenderScoreOrTimeBasedOnEventStatus from "./RenderScoreBasedOnStatus.jsx";

export default function GamesTable({
                                       items = [], loading = false, error = null, height = "h-92"
                                   }) {

    const navigate = useNavigate();
    if (loading) {
        return (<>
            <div className="container mx-auto w-full h-96 px-2 rounded-lg ">

                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 mb-2 rounded-md"></div>

            </div>
        </>);
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!items.length) {
        return <div className="p-4 text-center text-gray-500">Inga matcher</div>;
    }

    items = items.filter(item => item.league.sport.name !== "Bowling");

    return (<div className="p-4 w-full">
        <div className={`${height} overflow-x-auto rounded-lg shadow hidden md:block`}>
            <table className="table table-zebra w-full table-pin-cols table-pin-rows">
                <thead>
                <tr>
                    <th>Sport</th>
                    <th>Liga</th>
                    <th>Hemma</th>
                    <th>Tid/Resultat</th>
                    <th>Borta</th>
                    <th>Arena</th>
                    <th>Datum</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr
                        key={index}
                        className="hover:bg-base-300 cursor-pointer"
                        onClick={() => navigate(`/event/${item.id}`)}
                    >
                        <td className="text-center">
                            <IconFactory name={item.league.sport.name} className="h-5 w-5 mx-auto" />
                        </td>
                        <td>{item.league.name}</td>
                        <td className="flex items-center gap-2">
                            <img
                                className="w-6 h-6 object-contain"
                                src={item.homeTeam.logos.small}
                                alt={`${item.homeTeam.name} logo`}
                            />
                            <span>{item.homeTeam.name}</span>
                        </td>
                        <td className="text-center text-warning font-semibold">
                            <RenderScoreOrTimeBasedOnEventStatus item={item} />
                        </td>
                        <td className="flex items-center gap-2">
                            <span>{item.visitingTeam.name}</span>
                            <img
                                className="w-6 h-6 object-contain"
                                src={item.visitingTeam.logos.small}
                                alt={`${item.visitingTeam.name} logo`}
                            />
                        </td>
                        <td>{item.facts?.arena?.name ?? "Okänd arena"}</td>
                        <td>
                            {new Date(item.startDate).toLocaleString("sv-SE", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                timeZone: "Europe/Stockholm",
                            })}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        {/*För mobil*/}

        <div className="overflow-y-auto max-h-[45vh]">
            <table className="table table-sm text-xs md:hidden w-full">
                <thead>
                <tr>
                    <th>Match</th>
                    <th>Tid/Resultat</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr
                        key={index}
                        className="hover:bg-base-300 cursor-pointer h-10"
                        onClick={() => navigate(`/event/${item.id}`)}
                    >
                        <td className="py-1 px-0">
                            <div className="flex flex-row-reverse text-right">
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={item.homeTeam.logos.small}
                                    alt={item.homeTeam.abbreviation}
                                />
                                <span>{item.homeTeam?.abbreviation ?? item.homeTeam?.shortName}</span>
                            </div>
                        </td>

                        <td className="text-center text-warning font-semibold text-[11px] py-1 px-0">
                            <RenderScoreOrTimeBasedOnEventStatus item={item} />
                        </td>

                        <td className="py-1 px-0 mx-0">
                            <div className="flex items-center justify-start gap-1">
                                <img
                                    className="w-6 h-6 object-contain px-0"
                                    src={item.visitingTeam.logos.small}
                                    alt={item.visitingTeam.abbreviation}
                                />
                                <span>{item.visitingTeam?.abbreviation ?? item.visitingTeam.shortName}</span>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </div>);
}
