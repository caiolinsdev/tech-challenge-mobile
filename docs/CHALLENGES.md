# Desafios Técnicos - Tech Challenge Fase 04

Documentação dos principais desafios enfrentados durante o desenvolvimento.

---

## 1. Configuração da API no celular físico

**Problema:**  
O app mobile não conseguia conectar à API quando rodava no celular via Expo Go. Erro de "Network Error".

**Causa:**  
O `app.json` usava `localhost:3000` como URL da API. No celular, `localhost` aponta para o próprio dispositivo, não para o PC onde a API está rodando.

**Solução:**  
Configurar `extra.apiUrl` no `app.json` com o IP local do PC na rede Wi-Fi (ex: `http://192.168.1.100:3000`). O celular e o PC devem estar na mesma rede.

**Aprendizado:**  
Sempre considerar o contexto de execução: emuladores compartilham `localhost` com o host; dispositivos físicos precisam do IP da máquina.

---

## 2. Navegação entre tabs (FAB na Home)

**Problema:**  
O botão FAB na tela Home (para professores criarem posts) precisava navegar para a tela AdminPosts, que está em outra tab (Profile).

**Solução:**  
Usar `navigation.getParent()?.navigate('ProfileStack', { screen: 'AdminPosts' })` para navegar da HomeStack para a ProfileStack e abrir a tela AdminPosts diretamente.

**Aprendizado:**  
Em navegação aninhada (Tab > Stack > Screen), é necessário acessar o navigator pai para mudar de tab.

---

## 3. Migrations e seed com Docker

**Problema:**  
O comando `npx prisma migrate dev` precisa rodar no contexto onde a API e o banco estão acessíveis.

**Solução:**  
Usar `docker compose exec api npx prisma migrate dev` e `docker compose exec api npx prisma db seed` para executar dentro do container da API, que já tem acesso ao PostgreSQL.

**Aprendizado:**  
Com Docker Compose, os comandos de banco devem rodar no contexto do serviço que usa o banco.

---

## 4. TypeScript e Expo (customConditions)

**Problema:**  
Erro `TS5098: Option 'customConditions' can only be used when 'moduleResolution' is 'node16', 'nodenext', or 'bundler'` no build do backend.

**Causa:**  
O `tsconfig.json` do backend estendia `expo/tsconfig.base` (herança incorreta) e usava `moduleResolution: "node"`.

**Solução:**  
Remover o `extends` do Expo no backend ou ajustar para `moduleResolution: "node16"` e `module: "Node16"`. O backend não deve estender config do Expo.

**Aprendizado:**  
Evitar herdar configurações de projetos diferentes (mobile vs backend).

---

## 5. EMFILE (too many open files)

**Problema:**  
Erro `EMFILE: too many open files, watch` no Metro Bundler ao rodar o Expo no macOS.

**Solução:**  
Instalar o Watchman: `brew install watchman`. O Watchman gerencia file watching de forma mais eficiente que o watcher nativo do Node.

**Aprendizado:**  
Em projetos React Native/Expo no macOS, o Watchman é uma dependência recomendada.

---

## 6. Incompatibilidade de versão do Expo Go

**Problema:**  
"Project is incompatible with this version of Expo Go" — projeto em SDK 50, app em SDK 54.

**Solução:**  
Atualizar o projeto: `npx expo install expo@latest --fix`. Ou instalar versão compatível do Expo Go via link da documentação.

**Aprendizado:**  
Manter o SDK do projeto alinhado com a versão do Expo Go instalada no dispositivo.

---

## Débitos Técnicos

| Item | Status | Prioridade |
|------|--------|------------|
| Refresh token | Não implementado | Alta |
| Testes automatizados | Não implementado | Alta |
| Documentação OpenAPI/Swagger | Não implementado | Média |
| Comentários nos posts | Não implementado | Baixa |
| Push notifications | Não implementado | Baixa |
