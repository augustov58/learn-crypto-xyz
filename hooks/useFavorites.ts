'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { favoritesService } from '@/lib/services/favorites';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        setLoading(true);
        const userFavorites = await favoritesService.getFavorites(user.id);
        setFavorites(userFavorites);
        setLoading(false);
      } else {
        setFavorites(new Set());
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (topicId: string) => {
      if (!user) return false;

      const isFavorited = favorites.has(topicId);
      const newSet = new Set(favorites);

      if (isFavorited) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }

      setFavorites(newSet);

      const success = await favoritesService.toggleFavorite(user.id, topicId);
      if (!success) {
        // Revert on error
        setFavorites(favorites);
      }

      return success;
    },
    [user, favorites]
  );

  // Check if topic is favorited
  const isFavorited = useCallback(
    (topicId: string) => {
      return favorites.has(topicId);
    },
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorited,
    loading,
  };
}

