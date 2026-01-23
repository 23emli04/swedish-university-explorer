import { useEffect, useState } from "react";

export default function useFetchApi(apiCall, deps = [], defaultValue = []) {
    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setErr(null);
                const result = await apiCall();
                if (live) setData(result);
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchData();
        return () => {
            live = false;
        };
    }, deps);

    return { data, loading, err };
}
