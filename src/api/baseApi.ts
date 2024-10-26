/**
 * Base API configuration using Redux Toolkit Query
 * Sets up the base query with authentication token handling
 */

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_CONFIG} from '@constants/config';
import {storage} from '@services/storage';
import {STORAGE_KEYS} from '@constants/storage';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.baseUrl,
    // Automatically attach JWT token to all requests if available
    prepareHeaders: async headers => {
      const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  // Define tag types for cache invalidation
  tagTypes: ['User'],
});
