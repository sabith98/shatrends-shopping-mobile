export const API_CONFIG = {
  baseUrl: `${process.env.API_BASE_URL}` || 'http://localhost:1337/api',
  auth: {
    signIn: '/auth/local',
    signUp: '/auth/local/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    me: '/users/me',
  },
} as const;
