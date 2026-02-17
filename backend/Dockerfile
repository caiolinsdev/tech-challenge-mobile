# ==========================================
# Dockerfile - Blog API (Node.js)
# ==========================================

FROM node:20-alpine

# Instalar dependências do sistema
RUN apk add --no-cache openssl

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Build TypeScript
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]

