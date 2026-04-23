# Supabase (pasta `backend/supabase`)

- **Migração base do site (pedidos, perfis, inventário, RPC):** use o ficheiro na raiz do repositório  
  `../supabase/migrations/001_initial_schema.sql`  
  (caminho relativo a partir daqui: `../../supabase/migrations/001_initial_schema.sql`).

- **Catálogo de produtos na base (opcional, para evolução da loja):** ficheiros numerados nesta pasta, por exemplo `migrations/002_catalog_products.sql`.

Ordem sugerida no SQL Editor ou `supabase db push`:

1. `001_initial_schema.sql` (raiz do projeto)
2. `002_catalog_products.sql` (esta pasta, opcional se já incluído no 003)
3. `003_admin_ecommerce.sql` em `../../supabase/migrations/` — endereços em pedidos, cupons, notificações, catálogo, estado **Entregue**, RPC com `p_shipping_address`.

Se o trigger `on_auth_user_created` falhar, em Postgres 15+ substitua `execute procedure` por `execute function` na linha do trigger.
