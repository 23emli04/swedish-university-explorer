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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!providerId) return;

    setLoading(true);
    setError(null);

    EducationEventApiApi
        .getByProvider(providerId)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
  }, [providerId]);

  return { data, loading, error };
}



