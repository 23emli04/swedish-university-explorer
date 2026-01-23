import { useAllLeagues } from "../../hooks/LeagueHooks.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";
import formatLeaguePath from "../formatLeaguePath.jsx";

const currentYear = new Date().getFullYear();

export default function AllLeagues() {
    const { data: leagueData, loading: leaguesLoading, error: leaguesError } = useAllLeagues();
    const navigate = useNavigate();

    if (leaguesLoading) {
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

    if (leaguesError) {
        return <div>Error</div>;
    }


    const leagueCurrentYear = leagueData.filter(
        (l) => l?.season.startYear === currentYear && l?.sport.name !== "Bowling"
    );


    const leaguesBySport = leagueCurrentYear.reduce((groups, league) => {
        const sport = league.sport?.name || "Unknown Sport";
        if (!groups[sport]) groups[sport] = [];
        groups[sport].push(league);
        return groups;
    }, {});

    return (
        <div className="h-max overflow-x-auto">
            <table className="table table-pin-rows bg-base-200 w-full">
                {Object.entries(leaguesBySport).map(([sport, leagues]) => (
                    <React.Fragment key={sport}>
                        <thead>
                        <tr>
                            <th className="text-lg font-bold bg-base-300">{sport}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leagues.map((l) => (
                            <tr
                                key={l.id}
                                className="hover:bg-base-100 cursor-pointer transition"
                                onClick={() =>
                                    navigate(`/league/${formatLeaguePath(l.name)}/${l.teamClass.toLowerCase()}`)
                                }
                            >
                                <td className="font-semibold">
                                    {l.name}{" "}
                                    {l.name.includes("Superligan")
                                        ? l.teamClass.includes("WOMEN")
                                            ? "(Dam)"
                                            : "(Herr)"
                                        : ""}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </React.Fragment>
                ))}
            </table>
        </div>
    );
}

