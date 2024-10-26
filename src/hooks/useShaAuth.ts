/**
 * Custom hook for managing authentication state
 * Handles initial auth check and provides authentication status
 */

import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useGetMeQuery} from '@api/authApi';
import {storage} from '@services/storage';
import {STORAGE_KEYS} from '@constants/storage';
import type {RootState} from '@store/store';

export const useShaAuth = () => {
  const {isAuthenticated, user, isLoading, error} = useSelector(
    (state: RootState) => state.auth
  );
  const {refetch} = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Check for stored token and validate on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token && !user) {
        // Only fetch user data if we have a token but no user data
        refetch();
      }
    };

    checkAuth();
  }, [refetch, user]);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
  };
};
