import { useState, useEffect, useCallback } from 'react';
import { EducationEventApi } from '../../../lib/educationApi';

export function useEducationEvents({ page = 0, size = 20, sortBy = 'executionStart', sortDirection = 'DESC' } = {}) {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await EducationEventApi.getAll({ page, size, sortBy, sortDirection });
      setData(result || { content: [], totalPages: 0, totalElements: 0 });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [page, size, sortBy, sortDirection]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

export function useUpcomingEvents({ page = 0, size = 20 } = {}) {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let live = true;
    setLoading(true);
    EducationEventApi.getUpcoming({ page, size })
      .then(result => { if (live) setData(result || { content: [], totalPages: 0, totalElements: 0 }); })
      .catch(e => { if (live) setError(e); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [page, size]);

  return { data, loading, error };
}

export function useActiveEvents({ page = 0, size = 20 } = {}) {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let live = true;
    setLoading(true);
    EducationEventApi.getActive({ page, size })
      .then(result => { if (live) setData(result || { content: [], totalPages: 0, totalElements: 0 }); })
      .catch(e => { if (live) setError(e); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [page, size]);

  return { data, loading, error };
}

export function useEventSearch(query, { page = 0, size = 20 } = {}) {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setData({ content: [], totalPages: 0, totalElements: 0 });
      return;
    }
    let live = true;
    setLoading(true);
    EducationEventApi.search(query, { page, size })
      .then(result => { if (live) setData(result || { content: [], totalPages: 0, totalElements: 0 }); })
      .catch(e => { if (live) setError(e); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [query, page, size]);

  return { data, loading, error };
}

export function useEventsByProvider(providerId, { page = 0, size = 20 } = {}) {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!providerId) {
      setData({ content: [], totalPages: 0, totalElements: 0 });
      setLoading(false);
      return;
    }
    let live = true;
    setLoading(true);
    EducationEventApi.getByProvider(providerId, { page, size })
      .then(result => { if (live) setData(result || { content: [], totalPages: 0, totalElements: 0 }); })
      .catch(e => { if (live) setError(e); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [providerId, page, size]);

  return { data, loading, error };
}

export function useEventByIdentifier(identifier) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!identifier) {
      setData(null);
      setLoading(false);
      return;
    }
    let live = true;
    setLoading(true);
    EducationEventApi.getByIdentifier(identifier)
      .then(result => { if (live) setData(result); })
      .catch(e => { if (live) setError(e); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [identifier]);

  return { data, loading, error };
}
