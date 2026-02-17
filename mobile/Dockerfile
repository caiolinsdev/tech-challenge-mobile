# ==========================================
# Dockerfile - Mobile (Expo Dev Server)
# ==========================================

FROM node:20-alpine

# Instalar dependências do sistema
RUN apk add --no-cache git bash

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor portas do Expo
# 8081 - Metro Bundler
# 19000 - Expo Dev Server
# 19001 - Expo Dev Server (packager)
# 19002 - Expo Dev Tools
EXPOSE 8081 19000 19001 19002

# Variáveis de ambiente
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Comando de inicialização
CMD ["npx", "expo", "start", "--tunnel"]

