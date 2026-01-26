// src/hooks/useEducation.jsx
import { useState, useEffect } from 'react';
import {EducationApi, getApiBaseUrl} from "../../../lib/educationApi.js";

export function useEducationList({ page = 0, size = 20, sortBy = 'id', sortDirection = 'DESC' } = {}) {
    const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // src/hooks/useEducation.jsx
    useEffect(() => {
        let live = true;
        setLoading(true);

        // DEBUG: See exactly what is being called
        console.log("Calling API:", `${getApiBaseUrl()}/api/educationJobEd`);

        EducationApi.getEducations({ page, size, sortBy, sortDirection })
            .then(res => {
                if (!live) return;
                // IMPORTANT: 'res' is already an object because fetchJson called .json()
                setData({
                    content: res.content || [],
                    totalPages: res.totalPages || 0,
                    totalElements: res.totalItems || 0
                });
            })
            .catch(err => {
                if (live) {
                    console.error("Hook Error Details:", err);
                    setError(err);
                }
            })
            .finally(() => {
                if (live) setLoading(false);
            });

        return () => { live = false; };
    }, [page, size, sortBy, sortDirection]);
    console.log(data)
    return { data, loading, error };
}
export function useEducationSearch(query, { page = 0, size = 20 } = {}) {
    const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query || query.trim().length < 2) return;

        let live = true;
        setLoading(true);
        EducationApi.search(query, { page, size })
            .then(res => {
                if (live) setData({
                    content: res.educations || [],
                    totalPages: res.totalPages || 0,
                    totalElements: res.totalItems || 0
                });
            })
            .catch(e => { if (live) setError(e); })
            .finally(() => { if (live) setLoading(false); });

        return () => { live = false; };
    }, [query, page, size]);

    return { data, loading, error };
}