function getToken() {
  return localStorage.getItem('rr_admin_token');
}

export function setToken(token) {
  localStorage.setItem('rr_admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('rr_admin_token');
}

export function isLoggedIn() {
  return !!getToken();
}

export async function login(password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('Wrong password');
  const data = await res.json();
  setToken(data.token);
  return data;
}
