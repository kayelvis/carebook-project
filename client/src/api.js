const BASE_URL = import.meta.env.VITE_API_URL || '';

// One place for every API call: adds JSON headers and turns errors into messages.
export async function apiFetch(path, { method = 'GET', body } = {}) {
    console.log(BASE_URL);
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('token');
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  console.log(data);
  return data;
}