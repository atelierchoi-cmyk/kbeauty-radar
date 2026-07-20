-- K-Beauty Radar — Supabase schema
--
-- This mirrors the local JSON seed shape in src/data/ so that switching
-- src/lib/data.ts from local-JSON mode to Supabase mode (see USE_SUPABASE
-- in src/lib/config.ts) is a mechanical swap, not a data-model change.
--
-- Run with: supabase db push   (or paste into the SQL editor)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Core catalog
-- ---------------------------------------------------------------------

create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  english_name text not null,
  slug text unique not null,
  logo_url text,
  country_of_origin text,
  founded_year int,
  description text,
  positioning text,
  growth_stage text check (growth_stage in ('Established','Global Leader','Fast Growing','Viral Rising','Emerging','Watchlist')),
  official_url text,
  categories text[] default '{}',
  competitor_slugs text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brand_metrics (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  global_attention numeric,
  review_sentiment numeric,
  growth_momentum numeric,
  korea_strength numeric,
  global_strength numeric,
  viral_impact numeric,
  product_diversity numeric,
  data_confidence numeric,
  weekly_growth_pct numeric,
  data_date date not null default current_date,
  is_demo boolean not null default true
);

create table products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  name text not null,
  english_name text not null,
  slug text unique not null,
  category text,
  description text,
  size text,
  price_min numeric,
  price_max numeric,
  currency text default 'USD',
  skin_types text[] default '{}',
  skin_concerns text[] default '{}',
  reformulation_date date,
  launch_date date,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table ingredients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  overview text,
  created_at timestamptz not null default now()
);

create table product_ingredients (
  product_id uuid not null references products(id) on delete cascade,
  ingredient_id uuid not null references ingredients(id) on delete cascade,
  primary key (product_id, ingredient_id)
);

-- ---------------------------------------------------------------------
-- Reviews & sources
-- ---------------------------------------------------------------------

create table data_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  country text,
  source_type text,
  official_retailer boolean default false,
  supports_verified_purchase boolean default false,
  allows_incentivized_reviews boolean default false,
  trust_weight numeric default 50
);

create table countries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  region text
);

create table country_metrics (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references countries(id) on delete cascade,
  overall_attention numeric,
  data_date date not null default current_date
);

create table review_aggregates (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  source_id uuid not null references data_sources(id) on delete cascade,
  country_id uuid references countries(id),
  rating numeric,
  review_count int,
  positive_ratio numeric,
  negative_ratio numeric,
  verified_purchase_ratio numeric,
  incentivized_ratio numeric,
  top_positive_keywords text[] default '{}',
  top_negative_keywords text[] default '{}',
  data_date date not null default current_date,
  is_demo boolean not null default true
);

-- Individual review signals shown as short summaries + keywords, never
-- full review text (see Methodology / data policy).
create table review_signals (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  source_id uuid not null references data_sources(id) on delete cascade,
  summary text,
  keywords text[] default '{}',
  source_url text,
  review_date date,
  verified_purchase boolean,
  product_seeded boolean,
  is_demo boolean not null default true
);

-- ---------------------------------------------------------------------
-- Trend & celebrity events
-- ---------------------------------------------------------------------

create table trend_events (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  product_id uuid references products(id),
  event_type text not null,
  event_date date not null,
  description text not null,
  related_person text,
  source text,
  confidence_level text check (confidence_level in ('High','Medium','Low')),
  impact_value numeric,
  created_at timestamptz not null default now()
);

create table celebrity_events (
  id uuid primary key default gen_random_uuid(),
  celebrity_name text not null,
  brand_id uuid not null references brands(id) on delete cascade,
  product_id uuid references products(id),
  event_date date not null,
  platform text,
  event_type text,
  commercial_status text check (commercial_status in ('Organic mention','Product seeding','Paid partnership','Unconfirmed')),
  source_url text,
  source_label text,
  attention_lift_7d numeric,
  attention_lift_30d numeric,
  attention_lift_90d numeric,
  social_mentions_change numeric,
  review_growth_pct numeric,
  sentiment_change_pts numeric,
  confidence_level text check (confidence_level in ('High','Medium','Low')),
  is_demo boolean not null default true
);

-- ---------------------------------------------------------------------
-- Editorial
-- ---------------------------------------------------------------------

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  summary text,
  body text,
  author text,
  published_at timestamptz,
  data_as_of date,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table article_relations (
  article_id uuid not null references articles(id) on delete cascade,
  brand_id uuid references brands(id) on delete cascade,
  product_id uuid references products(id) on delete cascade
);

-- ---------------------------------------------------------------------
-- User-facing tables (require Supabase Auth)
-- ---------------------------------------------------------------------

create table profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  country text,
  age_range text,
  skin_type text,
  skin_concerns text[] default '{}',
  price_range text,
  interested_categories text[] default '{}',
  interested_ingredients text[] default '{}',
  updated_at timestamptz not null default now()
);

create table follows (
  user_id uuid not null references auth.users(id) on delete cascade,
  brand_id uuid not null references brands(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, brand_id)
);

create table saved_products (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table saved_comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_ids uuid[] not null,
  created_at timestamptz not null default now()
);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  confirmed boolean not null default false
);

create table retail_links (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,
  link_type text check (link_type in ('Official Store','Affiliate Link')),
  url text not null
);

create table admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id),
  action text not null,
  target_table text,
  target_id text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------

alter table profiles enable row level security;
alter table follows enable row level security;
alter table saved_products enable row level security;
alter table saved_comparisons enable row level security;

create policy "Users manage their own profile" on profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their own follows" on follows
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their own saved products" on saved_products
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their own saved comparisons" on saved_comparisons
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Catalog tables (brands, products, reviews, etc.) are public read, and
-- write-restricted to a service role / admin claim — configure an
-- `is_admin` custom claim or a separate `admins` table and policy before
-- exposing the /admin write paths directly against Supabase from the client.
alter table brands enable row level security;
alter table products enable row level security;
create policy "Public read brands" on brands for select using (true);
create policy "Public read products" on products for select using (true);
