import { useState, useEffect, useCallback } from 'react';
import {EducationApi, EducationInfoApi} from '../../../lib/educationApi';

export function useEducationInfos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await EducationInfoApi.getAll();
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

export function useEducationInfoByIdentifier(identifier) {
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
    EducationInfoApi.getByIdentifier(identifier)
      .then(result => { if (live) setData(result); })
      .catch(e => { if (live) setError(e); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [identifier]);

  return { data, loading, error };

}
