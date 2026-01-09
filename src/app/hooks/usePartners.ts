import { useState, useEffect } from 'react';
import { Partner } from '../types/Partner';
import { partnerAPI } from '../services/partnerAPI';

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load partners from API
  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const data = await partnerAPI.getAll();
      setPartners(data);
      setError(null);
    } catch (err) {
      setError('Failed to load partners');
      console.error(err);
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem('partners_data');
      if (saved) setPartners(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  const addPartner = async (partner: Omit<Partner, 'id' | 'createdAt'>) => {
    try {
      const newPartner = await partnerAPI.create(partner);
      setPartners(prev => [newPartner, ...prev]);
      return newPartner;
    } catch (err) {
      setError('Failed to add partner');
      console.error(err);
      throw err;
    }
  };

  const updatePartner = async (id: string, updates: Partial<Partner>) => {
    try {
      const updatedPartner = await partnerAPI.update(id, updates);
      setPartners(prev =>
        prev.map(partner => (partner.id === id || partner._id === id ? updatedPartner : partner))
      );
    } catch (err) {
      setError('Failed to update partner');
      console.error(err);
      throw err;
    }
  };

  const deletePartner = async (id: string) => {
    try {
      await partnerAPI.delete(id);
      setPartners(prev => prev.filter(partner => partner.id !== id && partner._id !== id));
    } catch (err) {
      setError('Failed to delete partner');
      console.error(err);
      throw err;
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const updatedPartner = await partnerAPI.toggleFavorite(id);
      setPartners(prev =>
        prev.map(partner =>
          partner.id === id || partner._id === id ? updatedPartner : partner
        )
      );
    } catch (err) {
      setError('Failed to toggle favorite');
      console.error(err);
      throw err;
    }
  };

  const getPartnerById = (id: string) => {
    return partners.find(partner => partner.id === id || partner._id === id);
  };

  const addMemory = async (id: string, memory: any) => {
    try {
      const updatedPartner = await partnerAPI.addMemory(id, memory);
      setPartners(prev =>
        prev.map(partner => (partner.id === id || partner._id === id ? updatedPartner : partner))
      );
      return updatedPartner;
    } catch (err) {
      setError('Failed to add memory');
      console.error(err);
      throw err;
    }
  };

  const addGift = async (id: string, gift: any) => {
    try {
      const updatedPartner = await partnerAPI.addGift(id, gift);
      setPartners(prev =>
        prev.map(partner => (partner.id === id || partner._id === id ? updatedPartner : partner))
      );
      return updatedPartner;
    } catch (err) {
      setError('Failed to add gift');
      console.error(err);
      throw err;
    }
  };

  const updateRating = async (id: string, rating: number) => {
    try {
      const updatedPartner = await partnerAPI.updateRating(id, rating);
      setPartners(prev =>
        prev.map(partner => (partner.id === id || partner._id === id ? updatedPartner : partner))
      );
      return updatedPartner;
    } catch (err) {
      setError('Failed to update rating');
      console.error(err);
      throw err;
    }
  };

  return {
    partners,
    loading,
    error,
    addPartner,
    updatePartner,
    deletePartner,
    toggleFavorite,
    getPartnerById,
    addMemory,
    addGift,
    updateRating,
    reload: loadPartners,
  };
}
