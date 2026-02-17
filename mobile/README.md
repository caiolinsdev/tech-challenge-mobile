# 📱 Blog App - Mobile

> Aplicativo React Native com Expo

## 🚀 Como Rodar

### Opção 1: Via Docker (Recomendado)

Não precisa instalar Node.js na sua máquina!

```bash
# Na raiz do projeto
cd ..

# Descobrir seu IP local (você vai precisar)
# macOS:
ipconfig getifaddr en0

# Linux:
hostname -I | awk '{print $1}'

# Subir apenas o mobile (API e DB já devem estar rodando)
docker-compose up mobile --build

# Ou subir tudo junto
docker-compose up --build
```

### Opção 2: Via Script

```bash
# Na raiz do projeto
./scripts/start-mobile.sh
```

### Opção 3: Localmente (requer Node.js)

```bash
npm install
npx expo start
```

---

## 📲 Conectando no App

1. **Baixe o Expo Go** no seu celular:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escaneie o QR Code** que aparece no terminal

3. **Ou digite a URL manualmente:**
   - iOS: `exp://SEU_IP:8081`
   - Android: `exp://SEU_IP:8081`

---

## ⚙️ Configuração da API

O app precisa saber onde está a API. Edite o arquivo `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://SEU_IP:3000"
    }
  }
}
```

**Importante:** Substitua `SEU_IP` pelo IP da sua máquina na rede local (ex: `192.168.1.100`).

Para descobrir seu IP:
- **macOS:** `ipconfig getifaddr en0`
- **Linux:** `hostname -I`
- **Windows:** `ipconfig` (procure por IPv4)

---

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Default |
|----------|-----------|---------|
| EXPO_PUBLIC_API_URL | URL da API | http://localhost:3000/api |

---

## 📁 Estrutura

```
mobile/
├── src/
│   ├── components/    # Componentes reutilizáveis
│   ├── contexts/      # Context API (Auth, etc)
│   ├── hooks/         # Custom hooks
│   ├── navigation/    # React Navigation
│   ├── screens/       # Telas do app
│   ├── services/      # API service (Axios)
│   ├── theme/         # Design system
│   └── utils/         # Utilitários
├── App.tsx            # Entry point
├── app.json           # Configuração Expo
└── package.json
```

---

## 🐛 Troubleshooting

### Erro de conexão com a API

1. Verifique se a API está rodando: `curl http://SEU_IP:3000/health`
2. Verifique se o celular está na mesma rede WiFi
3. Atualize o `apiUrl` no `app.json` com o IP correto

### QR Code não funciona

Use a opção de digitar a URL manualmente no Expo Go.

### Erro "Network request failed"

O celular não consegue acessar a API. Verifique:
- Se a API está rodando
- Se o IP está correto
- Se não há firewall bloqueando

---

## 📱 Credenciais de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Professor | professor@email.com | 123456 |
| Estudante | aluno@email.com | 123456 |

