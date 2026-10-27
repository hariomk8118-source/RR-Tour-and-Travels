const API = '';

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

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' };
}

export async function login(password) {
  const res = await fetch(`${API}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('Wrong password');
  const data = await res.json();
  setToken(data.token);
  return data;
}

export async function fetchBills() {
  const res = await fetch(`${API}/api/bills`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load bills');
  return res.json();
}

export async function createBill(bill) {
  const res = await fetch(`${API}/api/bills`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(bill),
  });
  if (!res.ok) throw new Error('Failed to create bill');
  return res.json();
}

export async function deleteBill(id) {
  const res = await fetch(`${API}/api/bills?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete bill');
  return res.json();
}

export async function fetchBillPublic(id) {
  const res = await fetch(`${API}/api/bill?id=${id}`);
  if (!res.ok) throw new Error('Bill not found');
  return res.json();
}
