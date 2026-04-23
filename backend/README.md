# Backend — Supabase, produtos e autenticação

Esta pasta agrupa **migrações SQL adicionais**, **documentação** e **scripts** que falam com o Supabase (fora do bundle Next.js).

## Estrutura

```
backend/
  README.md                 ← este ficheiro
  package.json              ← dependências só para scripts (opcional)
  env.example               ← modelo de variáveis para scripts
  scripts/
    seed-dev-admin.mjs      ← opcional: cria utilizador no Auth + role admin (requer env)
  supabase/
    README.md               ← ordem das migrações
    migrations/
      README.md
      002_catalog_products.sql
```

A migração **001** (perfis, pedidos, inventário, RPC `create_order_from_cart`) mantém-se em:

`../supabase/migrations/001_initial_schema.sql`

## Frontend (Next.js)

Na raiz do projeto, use **sempre** variáveis públicas para o browser:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Administrador no Supabase (recomendado)

1. Crie o utilizador em **Authentication** (e-mail + palavra-passe) ou registe-se na loja em `/cadastro`.
2. No **SQL Editor**, promova a conta a administrador (ajuste o e-mail):

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seu-email@exemplo.com';
```

3. Inicie sessão em `/admin/login` com esse e-mail e palavra-passe.

## Script opcional `npm run seed:admin`

Apenas se quiser automatizar a criação de um utilizador via **API Admin** (chave `service_role` no servidor). No `backend/.env` defina **obrigatoriamente**:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DEV_ADMIN_EMAIL`
- `DEV_ADMIN_PASSWORD`

Depois: `cd backend && npm install && npm run seed:admin`

Sem estas variáveis o script termina com instruções para usar o `UPDATE` em SQL acima.

## Catálogo na base (`catalog_products`)

Opcional: execute `backend/supabase/migrations/002_catalog_products.sql` depois da 001 (ou use a migração **003** na raiz do repositório, que também inclui o catálogo).

## Autenticação — fluxo resumido

| Área | Onde |
|------|------|
| Clientes | `/login`, `/cadastro`, `app/auth/callback`, `context/AuthContext.tsx` |
| Admin | `/admin/login`, layouts em `app/admin/` |
| Sessão no servidor | `lib/supabase/server.ts`, `middleware.ts` |

Políticas RLS e trigger de perfil estão na migração **001**.
