import { useState, useEffect, useCallback } from 'react';
import {
  EducationEventApi as EducationEventApiApi,
  EducationEventApi,
  EducationProviderApi
} from '../../../lib/educationApi';

export function useEducationProviders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await EducationProviderApi.getAll();
      setData(Array.isArray(result) ? result : []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}




export function useEducationProvider(providerId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!providerId) return;

    setLoading(true);
    setError(null);

    EducationProviderApi
        .getById(providerId)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
  }, [providerId]);

  return { data, loading, error };
}
export function useEducationByProvider(providerId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setMore] = useState(true);

  // Reset everything if the providerId changes
  useEffect(() => {
    setData([]);
    setPage(0);
    setMore(true);
  }, [providerId]);

  useEffect(() => {
    if (!providerId || !hasMore) return;

    setLoading(true);

    // Assuming your API client supports passing page/size:
    // .getByProvider(id, page, size)
    EducationEventApiApi
        .getByProvider(providerId, page, 20)
        .then((response) => {
          const newItems = response?.content || [];

          // Append data: keep old items, add new ones
          setData(prev => [...prev, ...newItems]);

          // Check if we reached the end (based on Spring Pageable properties)
          setMore(!response.last);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setLoading(false));
  }, [providerId, page]); // Triggers when provider changes OR page changes

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { data, loading, error, hasMore, loadMore };
}


