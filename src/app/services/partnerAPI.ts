const API_URL = import.meta.env.PROD 
  ? 'https://lovelqv.onrender.com/api/partners'
  : 'http://localhost:5000/api/partners';

export const partnerAPI = {
  // Get all approved partners
  getAll: async () => {
    const response = await fetch(`${API_URL}?status=approved`);
    if (!response.ok) throw new Error('Failed to fetch partners');
    return response.json();
  },

  // Get pending partners (admin only)
  getPending: async () => {
    const response = await fetch(`${API_URL}/pending`);
    if (!response.ok) throw new Error('Failed to fetch pending partners');
    return response.json();
  },

  // Get single partner
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch partner');
    return response.json();
  },

  // Create partner (admin only)
  create: async (partner: any) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...partner, status: 'approved' }),
    });
    if (!response.ok) throw new Error('Failed to create partner');
    return response.json();
  },

  // Public registration
  register: async (partner: any) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner),
    });
    if (!response.ok) throw new Error('Failed to register');
    return response.json();
  },

  // Approve partner
  approve: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}/approve`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to approve partner');
    return response.json();
  },

  // Reject partner
  reject: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}/reject`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to reject partner');
    return response.json();
  },

  // Update partner
  update: async (id: string, partner: any) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner),
    });
    if (!response.ok) throw new Error('Failed to update partner');
    return response.json();
  },

  // Delete partner
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete partner');
    return response.json();
  },

  // Toggle favorite
  toggleFavorite: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}/favorite`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to toggle favorite');
    return response.json();
  },

  // Add memory
  addMemory: async (id: string, memory: any) => {
    const response = await fetch(`${API_URL}/${id}/memories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memory),
    });
    if (!response.ok) throw new Error('Failed to add memory');
    return response.json();
  },

  // Add gift
  addGift: async (id: string, gift: any) => {
    const response = await fetch(`${API_URL}/${id}/gifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gift),
    });
    if (!response.ok) throw new Error('Failed to add gift');
    return response.json();
  },

  // Update rating
  updateRating: async (id: string, rating: number) => {
    const response = await fetch(`${API_URL}/${id}/rating`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating }),
    });
    if (!response.ok) throw new Error('Failed to update rating');
    return response.json();
  },
};

// Auth API
const AUTH_URL = 'http://localhost:5000/api/auth';

export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  createAdmin: async (username: string, password: string) => {
    const response = await fetch(`${AUTH_URL}/create-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Failed to create admin');
    return response.json();
  },
};

