// Arquivo de configuração para desenvolvimento/produção
// Copie e renomeie este arquivo para .env.local para usar variáveis de ambiente

const isProd = import.meta.env.PROD;

export const config = {
  // API — production is pinned; Vercel dashboard VITE_API_URL still has the old VPS host
  apiUrl: isProd
    ? 'https://plataforma-coral.vercel.app'
    : (import.meta.env.VITE_API_URL || 'http://localhost:3000'),
  
  // Mock — off in production builds
  useMock: isProd ? false : import.meta.env.VITE_USE_MOCK !== 'false',
  
  // Autenticação
  tokenKey: 'authToken',
  userKey: 'user',
};

export default config;
