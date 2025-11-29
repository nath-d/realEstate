import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import config from '../../config';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = config.api.baseUrl;

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
    
    // Listen for storage changes to sync auth across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_token') {
        if (e.newValue) {
          // Token was added/updated in another tab
          verifyToken(e.newValue);
        } else {
          // Token was removed in another tab
          clearAuth();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const initializeAuth = async () => {
    try {
      console.log('Initializing auth...');
      
      // Test server connectivity first
      try {
        const testResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Server connectivity test:', testResponse.status);
      } catch (connectError) {
        console.error('Server connectivity failed:', connectError);
      }
      
      // Check for existing token on app start
      const savedToken = localStorage.getItem('admin_token');
      console.log('Saved token found:', !!savedToken);
      
      if (savedToken) {
        // First, check if token is expired
        const decoded = decodeToken(savedToken);
        console.log('Decoded token:', decoded);
        
        if (decoded && decoded.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (decoded.exp < currentTime) {
            console.log('Token is expired');
            clearAuth();
            return;
          }
        }
        
        // Verify token by getting user profile
        await verifyToken(savedToken);
      } else {
        console.log('No saved token, setting loading to false');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      clearAuth();
    }
  };

  const verifyToken = async (savedToken: string) => {
    try {
      setIsLoading(true);
      
      console.log('Verifying token...', { tokenLength: savedToken.length });
      
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${savedToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Profile response status:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('Profile response data:', userData);
        
        // Check if response has the expected structure
        if (userData.success && userData.user) {
          // Check if user is admin
          if (userData.user.role !== 'admin') {
            throw new Error('Admin access required');
          }
          
          // Only set state if verification succeeds
          setUser(userData.user);
          setToken(savedToken);
          
          console.log('Auth restored successfully for user:', userData.user.email);
        } else {
          throw new Error('Invalid profile response format');
        }
      } else {
        // Token is invalid
        const errorText = await response.text();
        console.error('Profile request failed:', response.status, errorText);
        throw new Error(`Token verification failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuth = () => {
    console.log('Clearing auth state');
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  // Helper function to decode JWT token (for debugging)
  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success && data.token && data.user) {
        // Set state first, then localStorage
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('admin_token', data.token);
        
        console.log('Login successful for user:', data.user.email);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      clearAuth();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    clearAuth();
  };

  const refreshAuth = async () => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      await verifyToken(savedToken);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!token && !!user,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
