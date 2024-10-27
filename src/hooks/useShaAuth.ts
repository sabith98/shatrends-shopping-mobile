/**
 * Custom hook for managing authentication state
 * Handles initial auth check and provides authentication status
 */

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {storage} from '@services/storage';
import {STORAGE_KEYS} from '@constants/storage';
import type {RootState} from '@store/store';
import {setAuthenticated, setLoading, clearAuth} from '@store/slices/authSlice';

export const useShaAuth = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user, isLoading, error} = useSelector(
    (state: RootState) => state.auth
  );

  // Handle initial auth check
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch(setLoading(true));
        const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);

        if (token) {
          dispatch(setAuthenticated());
        } else {
          dispatch(clearAuth());
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        dispatch(clearAuth());
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
  };
};
