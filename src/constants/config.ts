export const API_CONFIG = {
  baseUrl: 'http://192.168.8.196:1337/api',
  auth: {
    signIn: '/auth/local',
    signUp: '/auth/local/register',
    forgotPassword: '/auth/forgot-password',
    verifyOTP: '/auth/verify-otp',
    resetPassword: '/auth/reset-password',
    me: '/users/me',
  },
} as const;
