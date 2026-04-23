-- Corrige: "infinite recursion detected in policy for relation profiles"
-- Causa: políticas em public.profiles com EXISTS (SELECT ... FROM profiles ...) reentram em RLS.
-- Solução: função STABLE SECURITY DEFINER (owner postgres) lê profiles sem o mesmo ciclo de políticas.

create or replace function public.auth_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
  );
$$;

alter function public.auth_is_admin() owner to postgres;

revoke all on function public.auth_is_admin() from public;
grant execute on function public.auth_is_admin() to authenticated;
grant execute on function public.auth_is_admin() to service_role;

-- ── profiles (003) ──
drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin" on public.profiles
  for select using (public.auth_is_admin());

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin" on public.profiles
  for update using (public.auth_is_admin());

-- ── 001: inventory, orders, order_items ──
drop policy if exists "inventory_admin_all" on public.inventory;
create policy "inventory_admin_all" on public.inventory
  for all
  to authenticated
  using (public.auth_is_admin())
  with check (public.auth_is_admin());

drop policy if exists "orders_select" on public.orders;
create policy "orders_select" on public.orders
  for select using (
    auth.uid() = user_id
    or public.auth_is_admin()
  );

drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin" on public.orders
  for update using (public.auth_is_admin());

drop policy if exists "order_items_select" on public.order_items;
create policy "order_items_select" on public.order_items
  for select using (
    exists (
      select 1
      from public.orders o
      where o.id = order_id
        and (
          o.user_id = auth.uid()
          or public.auth_is_admin()
        )
    )
  );

-- ── 003: cupons, notificações, catálogo (só se as tabelas existirem as policies já foram criadas pelo 003) ──
drop policy if exists "coupons_admin_all" on public.coupons;
create policy "coupons_admin_all" on public.coupons
  for all
  to authenticated
  using (public.auth_is_admin())
  with check (public.auth_is_admin());

drop policy if exists "admin_notifications_select" on public.admin_notifications;
create policy "admin_notifications_select" on public.admin_notifications
  for select using (public.auth_is_admin());

drop policy if exists "admin_notifications_update" on public.admin_notifications;
create policy "admin_notifications_update" on public.admin_notifications
  for update using (public.auth_is_admin());

drop policy if exists "catalog_products_admin_all" on public.catalog_products;
create policy "catalog_products_admin_all" on public.catalog_products
  for all
  to authenticated
  using (public.auth_is_admin())
  with check (public.auth_is_admin());

drop policy if exists "catalog_products_select" on public.catalog_products;
create policy "catalog_products_select" on public.catalog_products
  for select using (
    active = true
    or public.auth_is_admin()
  );
