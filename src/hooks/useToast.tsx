import React, {ReactNode, createContext, useCallback, useContext, useState} from 'react';
import {ShaSnackbar} from '@components/common';

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [state, setState] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setState({
      visible: true,
      message,
      type,
    });
  }, []);

  const hideToast = useCallback(() => {
    setState(prev => ({...prev, visible: false}));
  }, []);

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      <ShaSnackbar
        message={state.message}
        type={state.type}
        visible={state.visible}
        onDismiss={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Convenience hooks for different toast types
export const useSuccessToast = () => {
  const {showToast} = useToast();
  return useCallback(
    (message: string) => showToast(message, 'success'),
    [showToast],
  );
};

export const useErrorToast = () => {
  const {showToast} = useToast();
  return useCallback(
    (message: string) => showToast(message, 'error'),
    [showToast],
  );
};

export const useInfoToast = () => {
  const {showToast} = useToast();
  return useCallback(
    (message: string) => showToast(message, 'info'),
    [showToast],
  );
};

export const useWarningToast = () => {
  const {showToast} = useToast();
  return useCallback(
    (message: string) => showToast(message, 'warning'),
    [showToast],
  );
};
