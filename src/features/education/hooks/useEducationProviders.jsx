import { useState, useEffect, useCallback } from 'react';
import { EducationProviderApi } from '../../../lib/educationApi';

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
