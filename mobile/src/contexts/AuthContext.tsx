import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

import { api } from '../services/api';

// ==========================================
// Tipos
// ==========================================

export type Role = 'PROFESSOR' | 'STUDENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isProfessor: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ==========================================
// Constantes
// ==========================================

const TOKEN_KEY = 'blog_auth_token';
const USER_KEY = 'blog_auth_user';

// ==========================================
// Context
// ==========================================

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ==========================================
// Provider
// ==========================================

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        SecureStore.getItemAsync(TOKEN_KEY),
        SecureStore.getItemAsync(USER_KEY),
      ]);

      if (storedToken && storedUser) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados de autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user: userData } = response.data;

      // Salvar no storage
      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY, token),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData)),
      ]);

      // Configurar header de autorização
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(userData);
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      // Limpar storage
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
      ]);

      // Limpar header de autorização
      delete api.defaults.headers.common['Authorization'];

      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isProfessor: user?.role === 'PROFESSOR',
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}

