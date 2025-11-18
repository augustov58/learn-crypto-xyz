'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { progressService } from '@/lib/services/progress';

export function useProgress(topicId: string) {
  const { user } = useAuth();
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Load from localStorage (for non-authenticated users)
  const loadLocalProgress = useCallback(() => {
    if (typeof window === 'undefined') return new Set<string>();

    const stored = window.localStorage.getItem(`completed-${topicId}`);
    if (!stored) return new Set<string>();

    try {
      const parsed = JSON.parse(stored) as string[];
      return new Set(parsed);
    } catch {
      return new Set<string>();
    }
  }, [topicId]);

  // Save to localStorage
  const saveLocalProgress = useCallback((resources: Set<string>) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(`completed-${topicId}`, JSON.stringify(Array.from(resources)));
  }, [topicId]);

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      
      if (user) {
        // Load from Supabase
        const cloudProgress = await progressService.getTopicProgress(user.id, topicId);
        setCompletedResources(cloudProgress);
      } else {
        // Load from localStorage
        const localProgress = loadLocalProgress();
        setCompletedResources(localProgress);
      }
      
      setLoading(false);
    };

    loadProgress();
  }, [user, topicId, loadLocalProgress]);

  // Toggle resource completion
  const toggleResource = useCallback(
    async (resourceId: string) => {
      const isCompleted = completedResources.has(resourceId);
      const newSet = new Set(completedResources);

      if (isCompleted) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }

      setCompletedResources(newSet);

      if (user) {
        // Sync to Supabase
        setSyncing(true);
        if (isCompleted) {
          await progressService.markResourceIncomplete(user.id, topicId, resourceId);
        } else {
          await progressService.markResourceComplete(user.id, topicId, resourceId);
        }
        setSyncing(false);
      } else {
        // Save to localStorage
        saveLocalProgress(newSet);
      }
    },
    [user, topicId, completedResources, saveLocalProgress]
  );

  // Migrate localStorage to Supabase when user logs in
  const migrateLocalToCloud = useCallback(async () => {
    if (!user) return;

    const localProgress = loadLocalProgress();
    if (localProgress.size === 0) return;

    setSyncing(true);
    const localData: Record<string, string[]> = {
      [topicId]: Array.from(localProgress),
    };
    
    await progressService.syncFromLocalStorage(user.id, localData);
    
    // Clear localStorage after successful migration
    window.localStorage.removeItem(`completed-${topicId}`);
    
    // Reload from cloud
    const cloudProgress = await progressService.getTopicProgress(user.id, topicId);
    setCompletedResources(cloudProgress);
    
    setSyncing(false);
  }, [user, topicId, loadLocalProgress]);

  // Auto-migrate when user logs in
  useEffect(() => {
    if (user) {
      void migrateLocalToCloud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    completedResources,
    toggleResource,
    loading,
    syncing,
    migrateLocalToCloud,
  };
}

