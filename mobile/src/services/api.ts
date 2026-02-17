import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// ==========================================
// Configuração Base
// ==========================================

// Pegar URL da API das configurações do Expo ou usar default
const getApiUrl = (): string => {
  // Tentar pegar do extra do app.json
  const extraApiUrl = Constants.expoConfig?.extra?.apiUrl;
  if (extraApiUrl) return `${extraApiUrl}/api`;
  
  // Tentar pegar de variável de ambiente
  const envApiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envApiUrl) return envApiUrl;
  
  // Default para desenvolvimento local
  return 'http://localhost:3000/api';
};

const API_URL = getApiUrl();

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// Interceptor de Request
// ==========================================

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Adicionar token se existir
    const token = await SecureStore.getItemAsync('blog_auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// Interceptor de Response
// ==========================================

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Tratar erro 401 (não autorizado)
    if (error.response?.status === 401) {
      // Limpar token e redirecionar para login
      await SecureStore.deleteItemAsync('blog_auth_token');
      await SecureStore.deleteItemAsync('blog_auth_user');
      
      // O redirecionamento será tratado pelo AuthContext
    }

    // Extrair mensagem de erro da API
    const errorMessage = 
      (error.response?.data as any)?.error ||
      (error.response?.data as any)?.message ||
      error.message ||
      'Erro desconhecido';

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;

