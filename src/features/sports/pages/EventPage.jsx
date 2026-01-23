import { useParams } from "react-router-dom";
import { useEventId } from "../hooks/EventHooks.jsx";
import EventHeader from "../components/eventComponents/EventHeader.jsx";
import EventTimeline from "../components/eventComponents/EventTimeline.jsx";

import EventStatistics from "../components/eventComponents/EventStatistics.jsx";
import EventStatsShots from "../components/eventComponents/EventStatsShots.jsx";



export default function EventPage() {
    const { id } = useParams();
    const { data, loading, err } = useEventId(id);
    const event = data?.event;
    console.log("event", event);
    if (loading) return  (

        <div className="p-4 max-w-3xl mx-auto">
        <div  className="skeleton h-82 w-full mt-2 rounded-md"></div>
        <div  className="skeleton h-36 w-full mt-2 rounded-md"></div>
        <div  className="skeleton h-36 w-full mt-2 rounded-md"></div>
        <div  className="skeleton h-36 w-full mt-2 rounded-md"></div>
        <div  className="skeleton h-36 w-full mt-2 rounded-md"></div>

    </div>);
    if (err) return <p className="text-red-500">Error loading event</p>;
    if (!event) return <p>No event found</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <EventHeader event={event} />
            <EventStatsShots event={event} />
            <EventStatistics event={event} />
            <div className="divider text-3xl">Match Händelser</div>
            <EventTimeline event={event} />
        </div>
    );
}
