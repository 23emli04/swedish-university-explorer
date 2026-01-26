// src/hooks/useEducation.jsx
import { useState, useEffect } from 'react';
import { EducationApi } from "../../../lib/educationApi.js";

export function useEducationList({ page = 0, size = 20, sortBy = 'lastSynced', sortDirection = 'DESC' } = {}) {
    const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let live = true;
        setLoading(true);
        setError(null);

        EducationApi.getEducations({ page, size, sortBy, sortDirection })
            .then(res => {
                if (!live) return;
                setData({
                    content: res.content || [],        // Fixed: Use 'content'
                    totalPages: res.totalPages || 0,
                    totalElements: res.totalElements || 0 // Fixed: Use 'totalElements'
                });
            })
            .catch(err => {
                if (live) setError(err);
            })
            .finally(() => {
                if (live) setLoading(false);
            });

        return () => { live = false; };
    }, [page, size, sortBy, sortDirection]);

    return { data, loading, error };
}

export function useEducationSearch(query, { page = 0, size = 20 } = {}) {
    const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If query is too short, reset data and stop
        if (!query || query.trim().length < 2) {
            setData({ content: [], totalPages: 0, totalElements: 0 });
            setLoading(false);
            return;
        }

        let live = true;
        setLoading(true);
        setError(null);

        EducationApi.search(query, { page, size })
            .then(res => {
                if (live) setData({
                    content: res.content || [],        // Fixed: Use 'content'
                    totalPages: res.totalPages || 0,
                    totalElements: res.totalElements || 0 // Fixed: Use 'totalElements'
                });
            })
            .catch(e => { if (live) setError(e); })
            .finally(() => { if (live) setLoading(false); });

        return () => { live = false; };
    }, [query, page, size]);

    return { data, loading, error };
}