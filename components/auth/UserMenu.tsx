'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.refresh();
  };

  const userInitials = user.email
    ?.split('@')[0]
    .substring(0, 2)
    .toUpperCase() || 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        aria-label="User menu"
      >
        {userInitials}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-1">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user.email}
              </p>
            </div>
            <button
              onClick={() => {
                router.push('/profile');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Profile
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

