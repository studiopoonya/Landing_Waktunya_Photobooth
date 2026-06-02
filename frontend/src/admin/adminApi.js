const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api');

export const getToken  = ()  => localStorage.getItem('admin_token');
export const setToken  = (t) => localStorage.setItem('admin_token', t);
export const clearToken = () => localStorage.removeItem('admin_token');

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
}

async function guardedFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (res.status === 401) {
    clearToken();
    window.location.href = '/admin/login';
    throw new Error('Unauthenticated');
  }
  return res;
}

export async function adminLogin(email, password) {
  return fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export async function adminLogout() {
  await fetch(`${API_URL}/admin/logout`, { method: 'POST', headers: authHeaders() });
  clearToken();
}

export async function fetchStats() {
  const res = await guardedFetch(`${API_URL}/admin/stats`, { headers: authHeaders() });
  return res.json();
}

export async function fetchLeads(params = {}) {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
  ).toString();
  const res = await guardedFetch(`${API_URL}/admin/leads?${qs}`, { headers: authHeaders() });
  return res.json();
}

export async function deleteLead(id) {
  return guardedFetch(`${API_URL}/admin/leads/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}

export async function bulkDeleteLeads(ids) {
  return guardedFetch(`${API_URL}/admin/leads/bulk-destroy`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ ids }),
  });
}

export async function fetchAllLeadsForExport() {
  const res = await guardedFetch(`${API_URL}/admin/leads/export`, { headers: authHeaders() });
  return res.json();
}

export async function fetchAccounts() {
  const res = await guardedFetch(`${API_URL}/admin/accounts`, { headers: authHeaders() });
  return res.json();
}

export async function createAccount(data) {
  return guardedFetch(`${API_URL}/admin/accounts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

export async function deleteAccount(id) {
  return guardedFetch(`${API_URL}/admin/accounts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}

export async function updatePassword(id, password) {
  return guardedFetch(`${API_URL}/admin/accounts/${id}/password`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ password }),
  });
}

export async function getSetting(key) {
  const res = await fetch(`${API_URL.replace('/api', '')}/api/settings/${key}`, {
    headers: { 'Accept': 'application/json' },
  });
  const data = await res.json();
  return data.value;
}

export async function updateSetting(key, value) {
  const res = await guardedFetch(`${API_URL}/admin/settings/${key}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ value }),
  });
  return res.json();
}

export function downloadCSV(leads) {
  const headers = ['No', 'Nama', 'Nomor HP', 'Email', 'Tanggal Daftar'];
  const rows = leads.map((l, i) => [
    i + 1,
    l.name,
    l.phone,
    l.email,
    new Date(l.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
  ]);
  const csv = [headers, ...rows]
    .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
