export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Base error structure returned by Strapi APIs
export interface StrapiError {
  data?: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export interface AuthState {
  user: StrapiUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: StrapiError | null,
}
