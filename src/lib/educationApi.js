// Education API - configurable base URL
const STORAGE_KEY = 'education_api_base_url';
const DEFAULT_BASE = 'http://localhost:8080';

export function getApiBaseUrl() {
  if (typeof window === 'undefined') return DEFAULT_BASE;
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_BASE;
}

export function setApiBaseUrl(url) {
  localStorage.setItem(STORAGE_KEY, url);
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    ...options,
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text.slice(0, 200)}`);
  }
  
  if (res.status === 204) return null;
  return res.json();
}

// ─── Education Provider ───
export const EducationProviderApi = {
  getAll: () => fetchJson(`${getApiBaseUrl()}/api/educationProvider`),
};

// ─── Education Events (paged) ───
export const EducationEventApi = {
  getAll: ({ page = 0, size = 20, sortBy = 'executionStart', sortDirection = 'DESC' } = {}) =>
    fetchJson(`${getApiBaseUrl()}/api/education-events?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`),
  
  getUpcoming: ({ page = 0, size = 20, sortBy = 'executionStart' } = {}) =>
    fetchJson(`${getApiBaseUrl()}/api/education-events/upcoming?page=${page}&size=${size}&sortBy=${sortBy}`),
  
  getActive: ({ page = 0, size = 20, sortBy = 'executionStart' } = {}) =>
    fetchJson(`${getApiBaseUrl()}/api/education-events/active?page=${page}&size=${size}&sortBy=${sortBy}`),
  
  search: (query, { page = 0, size = 20 } = {}) =>
    fetchJson(`${getApiBaseUrl()}/api/education-events/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`),
  
  getByProvider: (providerId, { page = 0, size = 20 } = {}) =>
    fetchJson(`${getApiBaseUrl()}/api/education-events/provider/${encodeURIComponent(providerId)}?page=${page}&size=${size}`),
  
  getByTown: (town, { page = 0, size = 20 } = {}) =>
    fetchJson(`${getApiBaseUrl()}/api/education-events/town/${encodeURIComponent(town)}?page=${page}&size=${size}`),
  
  getByIdentifier: (identifier) =>
    fetchJson(`${getApiBaseUrl()}/api/education-events/${encodeURIComponent(identifier)}`),
  
  triggerSync: () =>
    fetchJson(`${getApiBaseUrl()}/api/education-events/sync`, { method: 'POST' }),
};

// ─── Education Info ───
export const EducationInfoApi = {
  getAll: () => fetchJson(`${getApiBaseUrl()}/api/v1/education-info`),
  
  getByIdentifier: (identifier) =>
    fetchJson(`${getApiBaseUrl()}/api/v1/education-info/${encodeURIComponent(identifier)}`),
  
  triggerFetch: () =>
    fetchJson(`${getApiBaseUrl()}/api/v1/education-info/fetch`, { method: 'POST' }),
};
