const API_BASE = 'http://127.0.0.1:3000/api/v1';

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function removeToken() {
  localStorage.removeItem('token');
}

async function api(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.error?.message || data.message || 'Something went wrong';
    throw new Error(msg);
  }

  return data;
}

function redirectIfNotAuth() {
  if (!getToken()) {
    window.location.href = 'index.html';
  }
}

function logout() {
  removeToken();
  window.location.href = 'index.html';
}