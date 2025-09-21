import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthResponse, LoginRequest, RegisterRequest } from '../types/user';
import APIService from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        isAuthenticated: true
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthenticated: false
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  actions: {
    login: (credentials: LoginRequest) => Promise<boolean>;
    register: (userData: RegisterRequest) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for saved user session on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response: AuthResponse = await APIService.login(credentials);
      
      if (response.success && response.user) {
        // Save user to localStorage
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
        return true;
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.message || 'Login failed' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Terjadi kesalahan saat login' });
      return false;
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response: AuthResponse = await APIService.register(userData);
      
      if (response.success && response.user) {
        // Save user to localStorage
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
        return true;
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.message || 'Registration failed' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Terjadi kesalahan saat registrasi' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    state,
    actions: {
      login,
      register,
      logout,
      clearError
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};