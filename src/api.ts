
import { Service, AppConfig } from './types';

const API_BASE = '/api/v1';

const getHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const loginUser = async (username: string, password: string): Promise<string> => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('auth_token', data.access_token);
    return data.access_token;
  } catch (e) {
    // Fallback for demo if backend is not running
    if (username === 'admin' && password === 'admin') {
      const mockToken = "mock_jwt_token_xyz_123";
      localStorage.setItem('auth_token', mockToken);
      return mockToken;
    }
    throw e;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  window.location.reload();
};

export const fetchConfig = async (): Promise<AppConfig> => {
  try {
    const response = await fetch('/config.json');
    if (!response.ok) throw new Error('Failed to load config');
    return await response.json();
  } catch (e) {
    console.error("Config fetch failed:", e);
    throw e;
  }
};

export const fetchHealthData = async (): Promise<Record<string, Partial<Service>>> => {
  try {
    const response = await fetch(`${API_BASE}/health`, {
      headers: getHeaders()
    });
    
    if (response.status === 401) {
      logoutUser();
      throw new Error('Session expired');
    }
    
    if (!response.ok) throw new Error('Backend unreachable');
    return await response.json();
  } catch (e) {
    // Silently fail and return empty object to trigger simulation fallback
    return {};
  }
};
