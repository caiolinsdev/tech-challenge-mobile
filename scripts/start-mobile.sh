#!/bin/bash

# ==========================================
# Script para iniciar o ambiente mobile
# ==========================================

echo "🚀 Iniciando ambiente de desenvolvimento mobile..."
echo ""

# Descobrir IP da máquina host
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    HOST_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    HOST_IP=$(hostname -I | awk '{print $1}')
else
    # Windows/WSL
    HOST_IP=$(hostname -I | awk '{print $1}')
fi

if [ -z "$HOST_IP" ]; then
    echo "⚠️  Não foi possível detectar o IP. Usando localhost."
    HOST_IP="localhost"
fi

echo "📱 IP do Host: $HOST_IP"
echo ""

# Exportar IP para o docker-compose
export HOST_IP=$HOST_IP

# Subir containers
echo "🐳 Subindo containers..."
docker-compose up --build mobile

echo ""
echo "✅ Para conectar no Expo Go:"
echo "   1. Baixe o app Expo Go no seu celular"
echo "   2. Escaneie o QR Code que aparecerá no terminal"
echo "   3. Ou acesse: exp://${HOST_IP}:8081"

