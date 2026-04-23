-- Rode este ficheiro no SQL Editor do Supabase (ou use a CLI de migrações).
-- 1) Cria as tabelas e políticas RLS
-- 2) Promova o primeiro administrador: UPDATE public.profiles SET role = 'admin' WHERE email = 'seu@email.com';

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'client'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.inventory (
  product_id text primary key,
  stock_quantity integer not null default 100,
  updated_at timestamptz default now() not null
);

alter table public.inventory enable row level security;

create policy "inventory_admin_all" on public.inventory
  for all to authenticated
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete restrict,
  customer_email text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'shipped', 'cancelled')),
  subtotal numeric(12, 2) not null,
  shipping numeric(12, 2) not null default 0,
  total numeric(12, 2) not null,
  created_at timestamptz default now() not null
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders on delete cascade,
  product_id text not null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "orders_select" on public.orders
  for select using (
    auth.uid() = user_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

create policy "orders_update_admin" on public.orders
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "order_items_select" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (
          o.user_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

create policy "order_items_insert_own" on public.order_items
  for insert with check (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

insert into public.inventory (product_id, stock_quantity)
values
  ('1', 200), ('2', 150), ('3', 80), ('4', 300), ('5', 120),
  ('6', 90), ('7', 110), ('8', 60), ('9', 75)
on conflict (product_id) do nothing;

-- Pedido atómico (pedido + linhas + stock) chamado pelo cliente autenticado
create or replace function public.create_order_from_cart(
  p_customer_email text,
  p_subtotal numeric,
  p_shipping numeric,
  p_total numeric,
  p_items jsonb
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
begin
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  insert into public.orders (user_id, customer_email, status, subtotal, shipping, total)
  values (v_uid, p_customer_email, 'pending', p_subtotal, p_shipping, p_total)
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

revoke all on function public.create_order_from_cart(text, numeric, numeric, numeric, jsonb) from public;
grant execute on function public.create_order_from_cart(text, numeric, numeric, numeric, jsonb) to authenticated;
