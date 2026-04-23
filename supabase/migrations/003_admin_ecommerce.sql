-- Painel admin e-commerce: endereço em pedidos, cupons, notificações, catálogo, estado entregue.

-- ── Pedidos: endereço de envio ──
alter table public.orders
  add column if not exists shipping_cep text,
  add column if not exists shipping_city text,
  add column if not exists shipping_state text,
  add column if not exists shipping_street text,
  add column if not exists shipping_number text,
  add column if not exists shipping_complement text default '',
  add column if not exists shipping_recipient_name text,
  add column if not exists shipping_phone text;

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check
  check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'));

-- ── Perfis: contacto e arquivo (soft delete) ──
alter table public.profiles
  add column if not exists phone text,
  add column if not exists city text,
  add column if not exists archived_at timestamptz;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id and archived_at is null);

create policy "profiles_select_admin" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id and archived_at is null);

create policy "profiles_update_admin" on public.profiles
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Cupons ──
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  discount_value numeric(12, 2) not null check (discount_value > 0),
  max_uses integer,
  used_count integer not null default 0,
  valid_from timestamptz,
  valid_until timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.coupons enable row level security;

create policy "coupons_admin_all" on public.coupons
  for all
  to authenticated
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Notificações admin ──
create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  message text not null,
  payload jsonb default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists admin_notifications_created_idx on public.admin_notifications (created_at desc);
create index if not exists admin_notifications_read_idx on public.admin_notifications (read_at) where read_at is null;

alter table public.admin_notifications enable row level security;

create policy "admin_notifications_select" on public.admin_notifications
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "admin_notifications_update" on public.admin_notifications
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Inserções apenas via trigger SECURITY DEFINER (sem policy INSERT = bloqueado para roles normais; trigger bypassa RLS como owner da função)
create or replace function public.trg_notify_new_order()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_notifications (type, title, message, payload)
  values (
    'new_order',
    'Novo pedido',
    coalesce('Cliente: ' || new.customer_email, 'Novo pedido'),
    jsonb_build_object('order_id', new.id, 'total', new.total, 'status', new.status)
  );
  return new;
end;
$$;

drop trigger if exists trg_orders_notify on public.orders;
create trigger trg_orders_notify
  after insert on public.orders
  for each row execute procedure public.trg_notify_new_order();

create or replace function public.trg_notify_order_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into public.admin_notifications (type, title, message, payload)
    values (
      'status_change',
      'Estado do pedido atualizado',
      'Pedido passou de ' || coalesce(old.status, '') || ' para ' || coalesce(new.status, ''),
      jsonb_build_object('order_id', new.id, 'old_status', old.status, 'new_status', new.status)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists trg_orders_status_notify on public.orders;
create trigger trg_orders_status_notify
  after update on public.orders
  for each row execute procedure public.trg_notify_order_status_change();

-- ── Catálogo (se ainda não existir) ──
create table if not exists public.catalog_products (
  id text primary key,
  slug text not null unique,
  cat text not null,
  category_label text not null,
  name text not null,
  description text not null default '',
  image_src text not null default '',
  price_number numeric(12, 2) not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalog_products enable row level security;

drop policy if exists "catalog_products_select_public" on public.catalog_products;
create policy "catalog_products_select_public" on public.catalog_products
  for select using (active = true);

drop policy if exists "catalog_products_admin_all" on public.catalog_products;
create policy "catalog_products_admin_all" on public.catalog_products
  for all
  to authenticated
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Admin pode ver produtos inativos
drop policy if exists "catalog_products_select_admin" on public.catalog_products;
create policy "catalog_products_select_admin" on public.catalog_products
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Ajuste: duas políticas SELECT — Postgres OR entre políticas do mesmo comando
-- Remover select_public para admin ver inativos: manter só uma policy select com (active ou admin)

drop policy if exists "catalog_products_select_public" on public.catalog_products;
drop policy if exists "catalog_products_select_admin" on public.catalog_products;

create policy "catalog_products_select" on public.catalog_products
  for select using (
    active = true
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Seed catálogo (ids alinhados ao site)
insert into public.catalog_products (id, slug, cat, category_label, name, description, image_src, price_number)
values
  ('1', 'melhorador-massa-premium', 'melhorador', 'Melhorador', 'Melhorador de Massa Premium',
   'Alta performance para massas de pão francês e artesanais.', '/melhorador-massa.jpg', 98.50),
  ('2', 'base-integral-multigraos', 'base', 'Base Pronta', 'Base Integral Multigrãos',
   'Mix de grãos integrais e sementes.', '/base-multigraos.jpg', 74.00),
  ('3', 'complexo-enzimatico-amilamix', 'enzima', 'Enzima', 'Complexo Enzimático AmilaMix',
   'Blend de amilases e hemicelulases.', '/enzima-amilamix.jpg', 215.00),
  ('4', 'fermento-biologico-seco', 'fermentacao', 'Fermentação', 'Fermento Biológico Seco Instantâneo',
   'Levedura de alta atividade.', '/fermento-seco.jpg', 42.90),
  ('5', 'gordura-vegetal-panificacao', 'gordura', 'Gordura', 'Gordura Vegetal Panificação Plus',
   'Zero trans para panificação.', '/gordura-vegetal.jpg', 18.70),
  ('6', 'melhorador-confeitaria', 'melhorador', 'Melhorador', 'Melhorador Especial Confeitaria',
   'Para massas doces e bolos.', '/melhorador-confeitaria.jpg', 112.00),
  ('7', 'base-ciabatta-italiana', 'base', 'Base Pronta', 'Base Ciabatta Italiana',
   'Alta hidratação e alvéolos irregulares.', '/base-ciabatta.jpg', 88.50),
  ('8', 'glucoxenzyme-anti-envelhecimento', 'enzima', 'Enzima', 'GlucoxEnzyme Anti-Envelhecimento',
   'Retarda o envelhecimento do miolo.', '/enzima-glucox.jpg', 380.00),
  ('9', 'massa-fermentada-natural', 'fermentacao', 'Fermentação', 'Massa Fermentada Natural',
   'Cultura viva para sourdough.', '/massa-fermentada.jpg', 62.00)
on conflict (id) do nothing;

-- ── RPC pedido com endereço (6º parâmetro opcional) ──
drop function if exists public.create_order_from_cart(text, numeric, numeric, numeric, jsonb);

create or replace function public.create_order_from_cart(
  p_customer_email text,
  p_subtotal numeric,
  p_shipping numeric,
  p_total numeric,
  p_items jsonb,
  p_shipping_address jsonb default '{}'::jsonb
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_order_id uuid;
  el jsonb;
  v_pid text;
  v_qty int;
  v_stock int;
  j jsonb := coalesce(p_shipping_address, '{}'::jsonb);
begin
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  insert into public.orders (
    user_id, customer_email, status, subtotal, shipping, total,
    shipping_cep, shipping_city, shipping_state, shipping_street, shipping_number,
    shipping_complement, shipping_recipient_name, shipping_phone
  )
  values (
    v_uid, p_customer_email, 'pending', p_subtotal, p_shipping, p_total,
    nullif(trim(j->>'cep'), ''),
    nullif(trim(j->>'city'), ''),
    nullif(trim(j->>'state'), ''),
    nullif(trim(j->>'street'), ''),
    nullif(trim(j->>'number'), ''),
    coalesce(nullif(trim(j->>'complement'), ''), ''),
    nullif(trim(j->>'recipient_name'), ''),
    nullif(trim(j->>'phone'), '')
  )
  returning id into v_order_id;

  for el in select * from jsonb_array_elements(p_items)
  loop
    v_pid := el->>'product_id';
    v_qty := (el->>'quantity')::int;
    select stock_quantity into v_stock from public.inventory where product_id = v_pid for update;
    if v_stock is null then
      raise exception 'unknown_product %', v_pid;
    end if;
    if v_stock < v_qty then
      raise exception 'insufficient_stock for %', v_pid;
    end if;
    update public.inventory
    set stock_quantity = stock_quantity - v_qty, updated_at = now()
    where product_id = v_pid;

    insert into public.order_items (order_id, product_id, product_name, quantity, unit_price)
    values (
      v_order_id,
      v_pid,
      el->>'product_name',
      v_qty,
      (el->>'unit_price')::numeric
    );
  end loop;

  return v_order_id;
end;
$$;

revoke all on function public.create_order_from_cart(text, numeric, numeric, numeric, jsonb, jsonb) from public;
grant execute on function public.create_order_from_cart(text, numeric, numeric, numeric, jsonb, jsonb) to authenticated;
