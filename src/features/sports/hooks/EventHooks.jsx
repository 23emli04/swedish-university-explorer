import {useEffect, useState} from "react";
import {SportsApi} from "../api.jsx";
import { pickList} from "../MockData.js";

/**
 * Retrieve all events in a specified time period and filtered by gender to get male and female league
 * separate
 * @param date
 * @param gender
 * @returns {{data: *[], loading: boolean, err: unknown}}
 */
export function useEvents(date, gender) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        (async () => {
            try {
                setLoading(true);
                    const res = await SportsApi.events(date, gender); // kan vara {sports:[...]} eller [...]
                    if (!live) return;
                    setData(pickList(res, 'events'));
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        })();
        return () => {
            live = false;
        };
    }, [date, gender]);

    return {data, loading, err};
}

/**
 *Retrieve all events from a specified matchId to see all events
 * @param id
 * @returns {{data: unknown, loading: boolean, err: unknown}}
 */
export function useEventId(id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        (async () => {
            try {
                setLoading(true);
                    const res = await SportsApi.eventsById(id);
                    if (!live) return;
                    setData(res);

            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        })();

        return () => {
            live = false;
        };
    }, [id]);

    return {data, loading, err};
}

/**
 *Retrieve all events with a specified status and from a set starting date to set end date
 * @param id
 * @param status
 * @param order
 * @returns {{data: unknown, loading: boolean, err: unknown}}
 */
export function useEventByLeagueId(id, status, order) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        (async () => {
            try {
                setLoading(true);
                    const res = await SportsApi.eventsByLeagueIdAndStatus(id, status, order);
                    console.log("Api svar från eventsByLeagueIDAndStatus", res);
                    if (!live) return;
                    setData(pickList(res, 'events'));

            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        })();

        return () => {
            live = false;
        };
    }, [id, status]);

    return {data, loading, err};
}