'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { progressService } from '@/lib/services/progress';
import { favoritesService } from '@/lib/services/favorites';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<{
    totalCompleted: number;
    topicsWithProgress: number;
    recentCompletions: Array<{
      id: string;
      topic_id: string;
      resource_id: string | null;
      completed_at: string;
    }>;
  }>({
    totalCompleted: 0,
    topicsWithProgress: 0,
    recentCompletions: [],
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [progressStats, favoriteTopics] = await Promise.all([
        progressService.getProgressStats(user.id),
        favoritesService.getFavorites(user.id),
      ]);

      setStats(progressStats);
      setFavorites(Array.from(favoriteTopics));
    } catch {
      // Error already logged in service
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router]);


  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent w-12 h-12 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Your Profile
        </h1>

        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Account Information
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">User ID:</span>{' '}
              <span className="font-mono text-sm">{user.id}</span>
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Resources Completed
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalCompleted}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Topics with Progress
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.topicsWithProgress}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Favorites
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {favorites.length}
            </p>
          </div>
        </div>

        {/* Recent Completions */}
        {stats.recentCompletions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recent Completions
            </h2>
            <div className="space-y-2">
              {stats.recentCompletions.map((completion) => (
                <div
                  key={completion.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {completion.topic_id}
                    </p>
                    {completion.resource_id && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Resource: {completion.resource_id}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(completion.completed_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Favorite Topics
            </h2>
            <div className="space-y-2">
              {favorites.map((topicId) => (
                <div
                  key={topicId}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {topicId}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {stats.totalCompleted === 0 && favorites.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Start learning to see your progress here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

