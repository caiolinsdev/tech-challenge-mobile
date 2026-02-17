import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorHandler';
import { routes } from './routes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Middlewares
// ==========================================

// CORS - permitir requisições do app mobile
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON
app.use(express.json());

// Parse URL encoded
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Rotas
// ==========================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api', routes);

// ==========================================
// Error Handler
// ==========================================

app.use(errorHandler);

// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
});

export default app;

