-- Configuração da loja: frete (mínimo para grátis + valor pago), endereço (Correios futuro), SEO.
-- Uma única linha id = 1.

create table if not exists public.shop_settings (
  id smallint primary key,
  constraint shop_settings_singleton check (id = 1),

  shipping_free_min_subtotal numeric(12, 2),
  shipping_paid_cost numeric(12, 2) not null default 35,

  store_legal_name text not null default '',
  store_trade_name text not null default '',
  store_email text not null default '',
  store_phone text not null default '',
  store_cep text not null default '',
  store_logradouro text not null default '',
  store_numero text not null default '',
  store_complemento text not null default '',
  store_bairro text not null default '',
  store_cidade text not null default '',
  store_uf text not null default '',

  correios_codigo_servico text not null default '',
  correios_cnpj_contrato text not null default '',
  correios_numero_cartao text not null default '',
  correios_ambiente text not null default 'homologacao',

  seo_title text not null default '',
  seo_description text not null default '',
  seo_keywords text not null default '',

  updated_at timestamptz not null default now()
);

insert into public.shop_settings (id, shipping_free_min_subtotal, shipping_paid_cost)
values (1, 500, 35)
on conflict (id) do nothing;

alter table public.shop_settings enable row level security;

drop policy if exists "shop_settings_select_public" on public.shop_settings;
create policy "shop_settings_select_public" on public.shop_settings
  for select
  using (true);

drop policy if exists "shop_settings_update_admin" on public.shop_settings;
create policy "shop_settings_update_admin" on public.shop_settings
  for update
  using (public.auth_is_admin())
  with check (public.auth_is_admin());

drop policy if exists "shop_settings_insert_admin" on public.shop_settings;
create policy "shop_settings_insert_admin" on public.shop_settings
  for insert
  with check (public.auth_is_admin());

grant select on public.shop_settings to anon;
grant select on public.shop_settings to authenticated;
grant update on public.shop_settings to authenticated;
grant insert on public.shop_settings to authenticated;

-- Valida frete do pedido com as mesmas regras da loja (evita manipulação no cliente).
create or replace function public.create_order_from_cart(
  p_customer_email text,
  p_subtotal numeric,
  p_shipping numeric,
  p_total numeric,
  p_items jsonb,
  p_shipping_address jsonb default '{}'::jsonb,
  p_coupon_code text default null,
  p_coupon_discount numeric default 0
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
  c public.coupons%rowtype;
  v_disc numeric := 0;
  v_expected_total numeric;
  v_ss public.shop_settings%rowtype;
  v_after numeric;
  v_expect_ship numeric;
begin
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  v_disc := round(coalesce(p_coupon_discount, 0), 2);

  if p_coupon_code is not null and trim(p_coupon_code) <> '' then
    select * into c from public.coupons
    where upper(trim(code)) = upper(trim(p_coupon_code))
      and active = true
      and (valid_from is null or valid_from <= now())
      and (valid_until is null or valid_until >= now())
      and (max_uses is null or used_count < max_uses)
    for update;

    if not FOUND then
      raise exception 'invalid_coupon';
    end if;

    if c.discount_type = 'percent' then
      v_disc := round(p_subtotal * (c.discount_value / 100.0), 2);
      if v_disc > p_subtotal then
        v_disc := p_subtotal;
      end if;
    else
      v_disc := least(c.discount_value, p_subtotal);
    end if;

    if abs(v_disc - round(coalesce(p_coupon_discount, 0), 2)) > 0.02 then
      raise exception 'coupon_mismatch';
    end if;
  else
    if coalesce(p_coupon_discount, 0) > 0.02 then
      raise exception 'coupon_mismatch';
    end if;
    v_disc := 0;
  end if;

  v_after := round(p_subtotal - v_disc, 2);

  select * into v_ss from public.shop_settings where id = 1;
  if not FOUND then
    v_expect_ship := case when v_after >= 500 then 0::numeric else 35::numeric end;
  elsif v_ss.shipping_free_min_subtotal is null then
    v_expect_ship := round(coalesce(v_ss.shipping_paid_cost, 35), 2);
  elsif v_after >= v_ss.shipping_free_min_subtotal then
    v_expect_ship := 0;
  else
    v_expect_ship := round(coalesce(v_ss.shipping_paid_cost, 35), 2);
  end if;

  if abs(round(coalesce(p_shipping, 0), 2) - v_expect_ship) > 0.02 then
    raise exception 'shipping_mismatch';
  end if;

  v_expected_total := round(p_subtotal - v_disc + p_shipping, 2);
  if abs(v_expected_total - round(p_total, 2)) > 0.02 then
    raise exception 'total_mismatch';
  end if;

  insert into public.orders (
    user_id, customer_email, status, subtotal, shipping, total,
    shipping_cep, shipping_city, shipping_state, shipping_street, shipping_number,
    shipping_complement, shipping_recipient_name, shipping_phone,
    coupon_code, coupon_discount
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
    nullif(trim(j->>'phone'), ''),
    nullif(trim(p_coupon_code), ''),
    v_disc
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

  if p_coupon_code is not null and trim(p_coupon_code) <> '' then
    update public.coupons
    set used_count = used_count + 1, updated_at = now()
    where upper(trim(code)) = upper(trim(p_coupon_code));
  end if;

  return v_order_id;
end;
$$;

alter function public.create_order_from_cart(text, numeric, numeric, numeric, jsonb, jsonb, text, numeric) owner to postgres;
