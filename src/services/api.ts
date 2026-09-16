import { Problem, Pilot } from '../types';
import { INITIAL_PROBLEMS, INITIAL_PILOTS } from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000/api';


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
