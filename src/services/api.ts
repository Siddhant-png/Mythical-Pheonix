import { Problem, Pilot } from '../types';
import { INITIAL_PROBLEMS, INITIAL_PILOTS } from '../data/mockData';
import { AuthUser, UserRole } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

async function authRequest(path: string, payload: Record<string, string>): Promise<AuthUser> { const response = await fetch(`${API_BASE_URL}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const body = await response.json(); if (!response.ok || !body.success) throw new Error(body.error || 'Something went wrong.'); return body.user as AuthUser; }
export const loginWithPassword = (email: string, password: string) => authRequest('/auth/login', { email, password });
export const registerWithPassword = (name: string, email: string, password: string, role: UserRole) => authRequest('/auth/register', { name, email, password, role });
export async function requestPasswordReset(email: string) { const response = await fetch(`${API_BASE_URL}/auth/request-reset`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); const body = await response.json(); if (!response.ok || !body.success) throw new Error(body.error || 'Unable to request reset.'); }
export const resetPasswordWithCode = (email: string, code: string, password: string) => authRequest('/auth/reset-password', { email, code, password });

export async function fetchUserInterestsFromApi(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/user/interests`);
    if (!res.ok) throw new Error('API server returned error');
    const data = await res.json();
    if (data.success && Array.isArray(data.selectedInterestIds)) {
      return data.selectedInterestIds;
    }
  } catch (err) {
    console.warn('[API Client] Server offline or unavailable, falling back to local state:', err);
  }
  return ['ai-vision', 'agri-drones', 'medtech', 'clean-water'];
}

export async function saveUserInterestsToApi(selectedInterestIds: string[]): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/user/interests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedInterestIds })
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.warn('[API Client] Save interests failed, kept local state:', err);
    return false;
  }
}

export async function fetchProblemsFromApi(): Promise<Problem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/problems`);
    if (!res.ok) throw new Error('API server returned error');
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
  } catch (err) {
    console.warn('[API Client] Server offline, using default problems list:', err);
  }
  return INITIAL_PROBLEMS;
}

export async function fetchPilotsFromApi(): Promise<Pilot[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/pilots`);
    if (!res.ok) throw new Error('API server returned error');
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
  } catch (err) {
    console.warn('[API Client] Server offline, using default pilots list:', err);
  }
  return INITIAL_PILOTS;
}
