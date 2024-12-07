/**
 * Custom API Error class for handling HTTP and application errors
 * Provides structured error handling with status codes and messages
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any,
    public code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Error codes for different types of errors
 */
export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Maps HTTP status codes to user-friendly messages
 */
const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: 'Invalid request. Please check your input.',
  401: 'Unauthorized. Please log in again.',
  403: 'Access forbidden. You don\'t have permission to access this resource.',
  404: 'Resource not found.',
  408: 'Request timeout. Please try again.',
  429: 'Too many requests. Please try again later.',
  500: 'Internal server error. Please try again later.',
  502: 'Bad gateway. Please try again later.',
  503: 'Service unavailable. Please try again later.',
};

/**
 * Handles API errors and returns a structured error object
 */
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  // Handle network errors
  if (error instanceof TypeError && error.message === 'Network Error') {
    return new ApiError(
      0,
      'Unable to connect to the server. Please check your internet connection.',
      null,
      ErrorCode.NETWORK_ERROR,
    );
  }

  // Handle RTK Query errors
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as any).status;
    const data = (error as any).data;
    
    // Handle Strapi specific errors
    if (data?.error?.message) {
      return new ApiError(
        status,
        data.error.message,
        data,
        getErrorCodeFromStatus(status),
      );
    }

    // Handle generic HTTP errors
    const message = HTTP_STATUS_MESSAGES[status] || 'An unexpected error occurred.';
    return new ApiError(
      status,
      message,
      data,
      getErrorCodeFromStatus(status),
    );
  }

  // Handle unknown errors
  return new ApiError(
    500,
    'An unexpected error occurred.',
    error,
    ErrorCode.UNKNOWN_ERROR,
  );
};

/**
 * Maps HTTP status codes to error codes
 */
const getErrorCodeFromStatus = (status: number): ErrorCode => {
  switch (status) {
    case 401:
      return ErrorCode.UNAUTHORIZED;
    case 400:
      return ErrorCode.VALIDATION_ERROR;
    case 404:
      return ErrorCode.NOT_FOUND;
    case 500:
    case 502:
    case 503:
      return ErrorCode.SERVER_ERROR;
    default:
      return ErrorCode.UNKNOWN_ERROR;
  }
};

/**
 * Formats error message for display to users
 */
export const formatErrorMessage = (error: ApiError): string => {
  if (error.code === ErrorCode.VALIDATION_ERROR && error.data?.error?.details) {
    // Handle validation errors specifically
    return Object.values(error.data.error.details)
      .flat()
      .join('. ');
  }
  return error.message;
};
