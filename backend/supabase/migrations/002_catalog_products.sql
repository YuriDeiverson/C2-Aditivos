-- Catálogo na base (alinhado a lib/products.ts — ids 1..9).
-- Rode depois de ../../supabase/migrations/001_initial_schema.sql

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

create index if not exists catalog_products_cat_idx on public.catalog_products (cat);
create index if not exists catalog_products_active_idx on public.catalog_products (active);

alter table public.catalog_products enable row level security;

create policy "catalog_products_select_public"
  on public.catalog_products
  for select
  using (active = true);

create policy "catalog_products_admin_all"
  on public.catalog_products
  for all
  to authenticated
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

insert into public.catalog_products (id, slug, cat, category_label, name, description, image_src, price_number)
values
  (
    '1',
    'melhorador-massa-premium',
    'melhorador',
    'Melhorador',
    'Melhorador de Massa Premium',
    'Formulação de alta performance para massas de pão francês, baguetes e pães artesanais. Melhora volume, textura miolo, cor de casca e prolonga a vida útil em até 40% sem aditivos artificiais agressivos.',
    '/melhorador-massa.jpg',
    98.50
  ),
  (
    '2',
    'base-integral-multigraos',
    'base',
    'Base Pronta',
    'Base Integral Multigrãos',
    'Base completa pronta para uso, com mix de grãos integrais, aveia, linhaça e sementes de girassol. Reduz tempo de produção em 60% mantendo perfil nutricional premium.',
    '/base-multigraos.jpg',
    74.00
  ),
  (
    '3',
    'complexo-enzimatico-amilamix',
    'enzima',
    'Enzima',
    'Complexo Enzimático AmilaMix',
    'Blend de amilases, hemicelulases e xilanases de última geração para maximizar volume e maciez de pão de forma e pão de leite. Compatível com fermentação direta e longa.',
    '/enzima-amilamix.jpg',
    215.00
  ),
  (
    '4',
    'fermento-biologico-seco',
    'fermentacao',
    'Fermentação',
    'Fermento Biológico Seco Instantâneo',
    'Levedura Saccharomyces cerevisiae liofilizada de alta atividade. Fermentação consistente em qualquer temperatura ambiente entre 24°C e 38°C.',
    '/fermento-seco.jpg',
    42.90
  ),
  (
    '5',
    'gordura-vegetal-panificacao',
    'gordura',
    'Gordura',
    'Gordura Vegetal Panificação Plus',
    'Gordura hidrogenada zero trans especial para panificação. Confere maciez, leveza e durabilidade à massa. Excelente para croissant, brioche e pão de leite.',
    '/gordura-vegetal.jpg',
    18.70
  ),
  (
    '6',
    'melhorador-confeitaria',
    'melhorador',
    'Melhorador',
    'Melhorador Especial Confeitaria',
    'Formulação exclusiva para massas doces, bolos e cucas. Melhora textura, elasticidade e umidade do miolo. Garante padronização lote a lote em produções de larga escala.',
    '/melhorador-confeitaria.jpg',
    112.00
  ),
  (
    '7',
    'base-ciabatta-italiana',
    'base',
    'Base Pronta',
    'Base Ciabatta Italiana',
    'Fórmula autêntica para produção de ciabatta com alvéolos irregulares e casca crocante. Permite alta hidratação (até 85%) sem perda de estrutura.',
    '/base-ciabatta.jpg',
    88.50
  ),
  (
    '8',
    'glucoxenzyme-anti-envelhecimento',
    'enzima',
    'Enzima',
    'GlucoxEnzyme Anti-Envelhecimento',
    'Glucose oxidase e lipase microbiana para retardar o envelhecimento e prolongar a maciez do miolo em até 5 dias. Essencial para pães embalados em redes supermercadistas.',
    '/enzima-glucox.jpg',
    380.00
  ),
  (
    '9',
    'massa-fermentada-natural',
    'fermentacao',
    'Fermentação',
    'Massa Fermentada Natural',
    'Cultura viva de Lactobacillus sanfranciscensis e leveduras selvagens em farinha de trigo integral. Sabor ácido equilibrado, aroma complexo e textura rústica.',
    '/massa-fermentada.jpg',
    62.00
  )
on conflict (id) do update set
  slug = excluded.slug,
  cat = excluded.cat,
  category_label = excluded.category_label,
  name = excluded.name,
  description = excluded.description,
  image_src = excluded.image_src,
  price_number = excluded.price_number,
  updated_at = now();
