/**
 * Authentication API endpoints implementation
 * Handles user authentication operations including login, registration,
 * user reset password, profile fetch, and logout functionality
 */

import {baseApi, baseQueryWithErrorHandler} from './baseApi';
import type {StrapiAuthResponse, StrapiUser} from '@/types/auth.types';
import {storage} from '@services/storage';
import {STORAGE_KEYS} from '@constants/storage';
import {API_CONFIG} from '@constants/config';
import {setUser, clearAuth} from '@store/slices/authSlice';
import {formatErrorMessage} from '@utils/errorHandler';

// Type definitions for authentication payloads
interface SignInCredentials {
  identifier: string;
  password: string;
}

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<StrapiAuthResponse, SignInCredentials>({
      query: credentials => ({
        url: API_CONFIG.auth.signIn,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;
          await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.jwt); // Store JWT token
          dispatch(setUser(data.user));
        } catch (error: any) {
          dispatch(clearAuth());
          throw new Error(formatErrorMessage(error.error.data));
        }
      },
    }),

    signUp: builder.mutation<StrapiAuthResponse, SignUpCredentials>({
      query: userData => ({
        url: API_CONFIG.auth.signUp,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;
          await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.jwt);
          dispatch(setUser(data.user));
        } catch (error: any) {
          dispatch(clearAuth());
          throw new Error(formatErrorMessage(error.error.data));
        }
      },
    }),

    getMe: builder.query<StrapiUser, void>({
      query: () => API_CONFIG.auth.me,
      providesTags: ['User'],
      async onQueryStarted(_, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error: any) {
          dispatch(clearAuth());
          await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          throw new Error(formatErrorMessage(error.error.data));
        }
      },
    }),

    logout: builder.mutation<{success: boolean}, void>({
      queryFn: async () => {
        try {
          await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          return {data: {success: true}};
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Failed to remove auth token',
              originalError: error,
            },
          };
        }
      },
      async onQueryStarted(_, {dispatch}) {
        dispatch(clearAuth());
      },
    }),

    forgotPassword: builder.mutation<{ok: boolean}, {email: string}>({
      query: credentials => ({
        url: API_CONFIG.auth.forgotPassword,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, {queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          throw new Error(formatErrorMessage(error.error.data));
        }
      },
    }),

    resetPassword: builder.mutation<
      StrapiAuthResponse,
      {code: string; password: string; passwordConfirmation: string}
    >({
      query: credentials => ({
        url: API_CONFIG.auth.resetPassword,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;
          await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.jwt);
          dispatch(setUser(data.user));
        } catch (error: any) {
          throw new Error(formatErrorMessage(error.error.data));
        }
      },
    }),

    verifyOTP: builder.mutation<
      {success: boolean; message: string},
      {email: string; otp: string}
    >({
      query: credentials => ({
        url: API_CONFIG.auth.verifyOTP,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, {queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          throw new Error(formatErrorMessage(error.error.data));
        }
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetMeQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
} = authApi;
