const API_URL = 'http://localhost:5000/api/partners';

export const partnerAPI = {
  // Get all partners
  getAll: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch partners');
    return response.json();
  },

  // Get single partner
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch partner');
    return response.json();
  },

  // Create partner
  create: async (partner: any) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner),
    });
    if (!response.ok) throw new Error('Failed to create partner');
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
};
