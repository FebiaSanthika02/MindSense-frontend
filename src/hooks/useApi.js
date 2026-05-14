/**
 * useApi.js — Centralized API hook for MindSense AI
 * Semua komunikasi ke backend ada di sini.
 * Ganti VITE_API_URL di .env.local untuk development,
 * dan di Vercel Environment Variables untuk production.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  /**
   * GET /health — cek status backend & model
   */
  async checkHealth() {
    const res = await fetch(`${API_URL}/health`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  /**
   * POST /analyze — analisis satu teks
   * @param {string} text
   */
  async analyze(text) {
    const res = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
      throw new Error(err.detail || `HTTP ${res.status}`);
    }
    return res.json();
  },

  /**
   * POST /analyze/batch — analisis banyak teks
   * @param {string[]} texts
   */
  async analyzeBatch(texts) {
    const res = await fetch(`${API_URL}/analyze/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
};

export { API_URL };
export default api;
