# Bolão 2026 – Guia de Setup Completo

## Visão Geral

Stack:
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend/DB**: Supabase (PostgreSQL + Auth + Realtime)
- **Deploy**: Vercel
- **Autenticação**: Google OAuth via Supabase

---

## Passo 1 — Registrar o domínio

1. Acesse [registro.br](https://registro.br)
2. Busque o domínio desejado (ex: `bolao2026.com.br`)
3. Registre — leva ~30min para propagar

---

## Passo 2 — Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em **New Project**
3. Escolha um nome (ex: `bolao2026`), senha forte e região **South America (São Paulo)**
4. Aguarde ~2min o projeto subir

### 2.1 — Executar o schema

1. No painel do Supabase, vá em **SQL Editor**
2. Cole o conteúdo de `supabase/schema.sql` e execute
3. Cole o conteúdo de `supabase/matches_seed.sql` e execute

### 2.2 — Configurar Google OAuth

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto novo
3. Vá em **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
4. Tipo: **Web application**
5. Authorized redirect URIs: `https://XXXX.supabase.co/auth/v1/callback`
   - Substitua `XXXX` pela URL do seu projeto Supabase
6. Salve e copie o **Client ID** e **Client Secret**
7. No Supabase: **Authentication → Providers → Google**
8. Cole o Client ID e Client Secret, habilite o provider

### 2.3 — Pegar as chaves do Supabase

No Supabase: **Project Settings → API**

Anote:
- `Project URL` → vai para `NEXT_PUBLIC_SUPABASE_URL`
- `anon / public key` → vai para `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Passo 3 — Configurar o projeto localmente

```bash
# Instalar Node.js 18+ se não tiver:
# https://nodejs.org

# Na pasta do projeto:
npm install

# Copiar variáveis de ambiente:
cp .env.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_APP_URL=https://seudominio.com.br
```

Testar localmente:

```bash
npm run dev
# Acesse http://localhost:3000
```

---

## Passo 4 — Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e crie conta (pode usar o Google)
2. Clique em **Add New Project → Import Git Repository**
   - Ou faça upload manual da pasta
3. Framework preset: **Next.js** (detecta automático)
4. Em **Environment Variables**, adicione as mesmas variáveis do `.env.local`
5. Clique em **Deploy**

### 4.1 — Adicionar domínio próprio no Vercel

1. No projeto Vercel: **Settings → Domains → Add**
2. Digite seu domínio `bolao2026.com.br`
3. No painel do Registro.br, adicione os DNS que o Vercel indicar
   (geralmente `CNAME` apontando para `cname.vercel-dns.com`)
4. Aguarde propagação (~1h)

### 4.2 — Atualizar URL de callback no Google Console

Após o deploy, adicione a URL de produção nas **Authorized redirect URIs**:
- `https://seudominio.com.br/api/auth/callback`
- `https://XXXX.supabase.co/auth/v1/callback` (já deve estar lá)

---

## Passo 5 — Tornar-se admin

Após fazer login no app pela primeira vez:

1. No Supabase: **Table Editor → profiles**
2. Encontre seu registro pelo email
3. Mude `is_admin` para `true`
4. Acesse `seudominio.com.br/admin`

---

## Passo 6 — Atualizar jogos da Copa

Os jogos estão populados com os principais times conhecidos (Brasil, Argentina, etc.)
e placeholders ("Seleção A2", "Seleção A3"...) para os demais.

Para atualizar:
1. Acesse `/admin`
2. Clique em **Editar** em cada jogo
3. Atualize os nomes dos times e o emoji da bandeira

Dica para emojis de bandeiras: [emojipedia.org](https://emojipedia.org/flags)

### Inserir resultados após cada jogo

1. No admin, clique em **Editar** no jogo encerrado
2. Insira o placar (ex: 2 × 1)
3. Mude o status para **Encerrado**
4. Clique em **Salvar** → os pontos são calculados automaticamente

---

## Passo 7 — Google AdSense (opcional)

1. Acesse sua conta AdSense existente em [adsense.google.com](https://adsense.google.com)
2. **Sites → Adicionar site** → insira seu domínio
3. Copie o snippet de verificação
4. No arquivo `src/app/layout.tsx`, descomente e preencha o bloco do AdSense
5. Aguarde aprovação (horas a dias para conta antiga)

Após aprovação, adicione os blocos de anúncio onde desejar:
```tsx
// Em qualquer página:
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-XXXXXXXX"
     data-ad-slot="XXXXXXXX"
     data-ad-format="auto"
/>
```

---

## Estrutura de arquivos

```
bolao2026/
├── supabase/
│   ├── schema.sql          # Schema completo do banco
│   └── matches_seed.sql    # Jogos da Copa 2026
├── src/
│   ├── app/
│   │   ├── page.tsx        # Agenda de jogos (home)
│   │   ├── login/          # Login com Google
│   │   ├── grupos/         # Lista de grupos
│   │   │   └── [id]/       # Grupo individual (apostas + ranking)
│   │   ├── entrar/         # Entrar por código de convite
│   │   ├── admin/          # Painel admin (resultados)
│   │   └── api/auth/       # Callback OAuth
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── MatchSchedule.tsx   # Agenda com filtros e fuso
│   │   ├── GroupBets.tsx       # Interface de apostas
│   │   ├── GroupRanking.tsx    # Ranking do grupo
│   │   ├── InviteModal.tsx     # Convidar amigos
│   │   ├── CreateGroupButton.tsx
│   │   └── AdminMatchList.tsx  # Admin de jogos
│   └── lib/
│       ├── supabase.ts         # Clientes Supabase
│       ├── database.types.ts   # Tipos TypeScript
│       └── utils.ts            # CPF, fuso, formatação
├── .env.example
├── package.json
└── SETUP.md                # Este arquivo
```

---

## Sistema de pontos (padrão)

| Resultado | Pontos |
|-----------|--------|
| Placar exato | 10 |
| Acertou o vencedor | 5 |
| Acertou o empate (placar diferente) | 3 |
| Errou | 0 |

O dono do grupo pode personalizar a pontuação na criação do grupo
(campo `scoring_system` no banco, em JSON).

---

## Problemas comuns

**Login com Google não funciona:**
- Verifique se o redirect URI está correto no Google Console
- Confirme que o provider Google está habilitado no Supabase

**Apostas não salvam:**
- Verifique se o usuário tem um registro em `profiles`
- O trigger `on_auth_user_created` cria automaticamente — se não criou, insira manualmente

**Página admin mostra 404:**
- Certifique-se que `is_admin = true` no seu registro em `profiles`

**Pontos não calcularam:**
- Status do jogo precisa estar `finished` + placar preenchido
- O botão Salvar no admin chama `calculate_points` automaticamente

---

## Próximas versões (roadmap)

- [ ] Cadastro com CPF (já tem validação no `utils.ts`)
- [ ] Verificação de email
- [ ] Login com Apple (obrigatório para apps iOS)
- [ ] Notificações push (PWA)
- [ ] App nativo React Native / Expo
- [ ] Campeão da Copa (aposta especial)
- [ ] Artilheiro (aposta especial)
