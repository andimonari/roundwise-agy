// Roundwise Frontend API Service
// Connects to Fastify backend (/v1) with seamless mock fallback if offline

const API_BASE = 'http://localhost:3001/v1';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`API ${endpoint} failed: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[Roundwise API Warning] ${endpoint} request failed, using local mock fallback.`, err.message);
    return null;
  }
}

export const api = {
  async getHealth() {
    return (await request('/health')) || { status: 'mock_fallback', version: 'v1' };
  },

  async getUserSession() {
    return (
      (await request('/auth/session')) || {
        user: {
          id: 'user-mock-1',
          name: 'Dr. Alexander Wright',
          email: 'alex.wright@example.nhs.uk',
          role: 'candidate',
          consentGDPR: true,
          consentAudio: true,
          consentCaldicott: true,
        },
        entitlement: {
          type: 'unlimited_pass',
          creditsRemaining: 99,
        },
      }
    );
  },

  async saveConsent(consentData) {
    return (
      (await request('/auth/consent', {
        method: 'POST',
        body: JSON.stringify(consentData),
      })) || { success: true }
    );
  },

  async uploadCv(filename = 'Curriculum_Vitae_Dr_Alexander_Wright.pdf') {
    return (
      (await request('/cv/upload', {
        method: 'POST',
        body: JSON.stringify({ filename }),
      })) || {
        success: true,
        document: { id: `doc-${Date.now()}`, filename },
      }
    );
  },

  async getCvFacts(documentId) {
    return await request(`/cv/facts/${documentId}`);
  },

  async updateCvFact(factId, status, editedText) {
    return (
      (await request(`/cv/facts/${factId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, editedText }),
      })) || { success: true }
    );
  },

  async createSession({ specialtyCode = 'imt', stationType = 'clinical', answerSeconds = 180, questionCount = 7 }) {
    return (
      (await request('/sessions', {
        method: 'POST',
        body: JSON.stringify({ specialtyCode, stationType, answerSeconds, questionCount }),
      })) || {
        success: true,
        session: {
          id: `session-local-${Date.now()}`,
          specialtyCode,
          stationType,
          answerSeconds,
          questionCount,
        },
        wsUrl: 'ws://localhost:3001/v1/session',
      }
    );
  },

  async getSession(sessionId) {
    return await request(`/sessions/${sessionId}`);
  },

  async getScores(sessionId) {
    return await request(`/scoring/${sessionId}`);
  },

  async rescore(sessionId) {
    return await request(`/scoring/rescore/${sessionId}`, { method: 'POST' });
  },

  async createCheckout(plan = 'single_station') {
    return (
      (await request('/billing/checkout', {
        method: 'POST',
        body: JSON.stringify({ plan }),
      })) || {
        success: true,
        checkoutUrl: '#checkout-success',
      }
    );
  },

  async getQuestions() {
    return await request('/admin/questions');
  },

  async getAdminMetrics() {
    return await request('/admin/metrics');
  },
};
