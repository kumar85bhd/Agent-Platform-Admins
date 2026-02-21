
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
  // In your real setup, this calls the Python /token endpoint
  // For the prototype, we simulate a successful login if credentials are correct
  if (username === 'admin' && password === 'admin') {
    const mockToken = "mock_jwt_token_xyz_123";
    localStorage.setItem('auth_token', mockToken);
    return mockToken;
  }
  throw new Error('Invalid credentials');
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  window.location.reload();
};

export const fetchConfig = async (): Promise<AppConfig> => {
  const response = await fetch('/config.json');
  return response.json();
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
    return response.json();
  } catch (e) {
    console.warn("FastAPI backend not found or unreachable, continuing with simulation.");
    return {};
  }
};
