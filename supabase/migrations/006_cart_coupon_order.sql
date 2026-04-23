-- Cupom no checkout: pré-visualização pública (RPC) e registo no pedido + incremento de uso.

alter table public.orders
  add column if not exists coupon_code text,
  add column if not exists coupon_discount numeric not null default 0;

create or replace function public.preview_cart_coupon(p_code text, p_merchandise_subtotal numeric)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c public.coupons%rowtype;
  disc numeric := 0;
begin
  if p_merchandise_subtotal is null or p_merchandise_subtotal < 0 then
    return jsonb_build_object('ok', false, 'message', 'Subtotal inválido');
  end if;
  if p_code is null or trim(p_code) = '' then
    return jsonb_build_object('ok', false, 'message', 'Informe o código do cupom');
  end if;

  select * into c from public.coupons
  where upper(trim(code)) = upper(trim(p_code))
    and active = true
    and (valid_from is null or valid_from <= now())
    and (valid_until is null or valid_until >= now())
    and (max_uses is null or used_count < max_uses)
  limit 1;

  if not FOUND then
    return jsonb_build_object('ok', false, 'message', 'Cupom inválido, inactivo ou expirado');
  end if;

  if c.discount_type = 'percent' then
    disc := round(p_merchandise_subtotal * (c.discount_value / 100.0), 2);
    if disc > p_merchandise_subtotal then
      disc := p_merchandise_subtotal;
    end if;
  elsif c.discount_type = 'fixed' then
    disc := least(c.discount_value, p_merchandise_subtotal);
  else
    return jsonb_build_object('ok', false, 'message', 'Tipo de desconto inválido');
  end if;

  return jsonb_build_object(
    'ok', true,
    'code', c.code,
    'coupon_id', c.id,
    'discount_amount', disc,
    'name', c.name
  );
end;
$$;

alter function public.preview_cart_coupon(text, numeric) owner to postgres;

revoke all on function public.preview_cart_coupon(text, numeric) from public;
grant execute on function public.preview_cart_coupon(text, numeric) to anon;
grant execute on function public.preview_cart_coupon(text, numeric) to authenticated;

drop function if exists public.create_order_from_cart(text, numeric, numeric, numeric, jsonb);
drop function if exists public.create_order_from_cart(text, numeric, numeric, numeric, jsonb, jsonb);

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

revoke all on function public.create_order_from_cart(text, numeric, numeric, numeric, jsonb, jsonb, text, numeric) from public;
grant execute on function public.create_order_from_cart(text, numeric, numeric, numeric, jsonb, jsonb, text, numeric) to authenticated;
