/**
 * Base API configuration using Redux Toolkit Query
 * Sets up the base query with authentication token handling
 */

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_CONFIG} from '@constants/config';
import {storage} from '@services/storage';
import {STORAGE_KEYS} from '@constants/storage';
import {handleApiError} from '@utils/errorHandler';

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
    timeout: 15000, // 15 second timeout
  }),
  endpoints: () => ({}),
  // Define tag types for cache invalidation
  tagTypes: ['User'],
});

// Create a wrapped version of baseQuery with error handling
export const baseQueryWithErrorHandler = async (args: any, api: any, extraOptions: any) => {
  try {
    const result = await baseApi.baseQuery(args, api, extraOptions);
    if (result.error) {
      throw handleApiError(result.error);
    }
    return result;
  } catch (error) {
    const handledError = handleApiError(error);
    return {
      error: { status: handledError.status, data: handledError },
    };
  }
};
