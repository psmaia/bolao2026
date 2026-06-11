-- ============================================================
-- BOLAO 2026 - Schema Supabase
-- Execute este arquivo no SQL Editor do seu projeto Supabase
-- ============================================================

-- Habilitar extensões necessárias
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (dados extras do usuário além do auth)
-- ============================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  nickname text not null,
  email text not null,
  cpf text,
  phone text,
  cpf_verified boolean default false,
  phone_verified boolean default false,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índice para busca por email
create unique index profiles_email_idx on public.profiles(email);
create unique index profiles_cpf_idx on public.profiles(cpf) where cpf is not null;

-- RLS (Row Level Security)
alter table public.profiles enable row level security;

create policy "Perfil público visível para autenticados"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Usuário edita próprio perfil"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

create policy "Usuário insere próprio perfil"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- ============================================================
-- MATCHES (jogos da Copa)
-- ============================================================
create table public.matches (
  id uuid default uuid_generate_v4() primary key,
  match_number int not null,
  stage text not null, -- 'group', 'r32', 'r16', 'qf', 'sf', '3rd', 'final'
  group_name text, -- 'A', 'B', ... null para mata-mata
  home_team text not null default 'A definir',
  away_team text not null default 'A definir',
  home_flag text, -- emoji ou código do país
  away_flag text,
  venue text not null,
  city text not null,
  country text not null, -- 'USA', 'Canada', 'Mexico'
  match_date timestamptz not null, -- sempre em UTC
  home_score int,
  away_score int,
  status text default 'scheduled', -- 'scheduled', 'live', 'finished', 'cancelled'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices
create index matches_date_idx on public.matches(match_date);
create index matches_stage_idx on public.matches(stage);
create index matches_status_idx on public.matches(status);

-- RLS
alter table public.matches enable row level security;

create policy "Jogos visíveis para todos"
  on public.matches for select
  using (true);

create policy "Apenas admins editam jogos"
  on public.matches for all
  to authenticated
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================================
-- GROUPS (grupos de bolão)
-- ============================================================
create table public.groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  invite_code text unique default upper(substring(md5(random()::text), 1, 8)),
  scoring_system jsonb default '{"exact": 10, "winner": 5, "draw_guess": 3}'::jsonb,
  -- exact: acertou placar exato, winner: acertou vencedor, draw_guess: acertou empate
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.groups enable row level security;

create policy "Grupos visíveis para membros"
  on public.groups for select
  to authenticated
  using (
    exists (
      select 1 from public.group_members
      where group_id = groups.id and user_id = auth.uid()
    )
    or owner_id = auth.uid()
  );

create policy "Autenticados criam grupos"
  on public.groups for insert
  to authenticated
  with check (owner_id = auth.uid());

create policy "Dono edita grupo"
  on public.groups for update
  to authenticated
  using (owner_id = auth.uid());

create policy "Dono deleta grupo"
  on public.groups for delete
  to authenticated
  using (owner_id = auth.uid());

-- ============================================================
-- GROUP MEMBERS
-- ============================================================
create table public.group_members (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text default 'member', -- 'owner', 'member'
  joined_at timestamptz default now(),
  unique(group_id, user_id)
);

-- RLS
alter table public.group_members enable row level security;

create policy "Membros visíveis para membros do grupo"
  on public.group_members for select
  to authenticated
  using (
    exists (
      select 1 from public.group_members gm
      where gm.group_id = group_members.group_id and gm.user_id = auth.uid()
    )
  );

create policy "Usuário se adiciona ao grupo"
  on public.group_members for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Dono remove membros"
  on public.group_members for delete
  to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.groups where id = group_id and owner_id = auth.uid()
    )
  );

-- ============================================================
-- GROUP INVITES
-- ============================================================
create table public.group_invites (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  invited_by uuid references public.profiles(id) on delete cascade not null,
  invited_email text not null,
  invited_user_id uuid references public.profiles(id) on delete set null,
  status text default 'pending', -- 'pending', 'accepted', 'declined', 'expired'
  token text unique default uuid_generate_v4()::text,
  expires_at timestamptz default (now() + interval '7 days'),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.group_invites enable row level security;

create policy "Convite visível para convidado e dono do grupo"
  on public.group_invites for select
  to authenticated
  using (
    invited_user_id = auth.uid()
    or invited_email = (select email from public.profiles where id = auth.uid())
    or invited_by = auth.uid()
    or exists (select 1 from public.groups where id = group_id and owner_id = auth.uid())
  );

create policy "Membros convidam"
  on public.group_invites for insert
  to authenticated
  with check (
    invited_by = auth.uid()
    and exists (
      select 1 from public.group_members
      where group_id = group_invites.group_id and user_id = auth.uid()
    )
  );

create policy "Convidado atualiza próprio convite"
  on public.group_invites for update
  to authenticated
  using (
    invited_user_id = auth.uid()
    or invited_email = (select email from public.profiles where id = auth.uid())
  );

-- ============================================================
-- BETS (apostas)
-- ============================================================
create table public.bets (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  match_id uuid references public.matches(id) on delete cascade not null,
  home_score_bet int not null,
  away_score_bet int not null,
  points_earned int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(group_id, user_id, match_id)
);

-- RLS
alter table public.bets enable row level security;

create policy "Apostas visíveis para membros do grupo"
  on public.bets for select
  to authenticated
  using (
    exists (
      select 1 from public.group_members
      where group_id = bets.group_id and user_id = auth.uid()
    )
  );

create policy "Usuário faz própria aposta"
  on public.bets for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.group_members
      where group_id = bets.group_id and user_id = auth.uid()
    )
    -- Só pode apostar antes do jogo começar
    and exists (
      select 1 from public.matches
      where id = bets.match_id and match_date > now()
    )
  );

create policy "Usuário atualiza própria aposta antes do jogo"
  on public.bets for update
  to authenticated
  using (
    user_id = auth.uid()
    and exists (
      select 1 from public.matches
      where id = bets.match_id and match_date > now()
    )
  );

-- ============================================================
-- FUNÇÃO: calcular pontos após resultado
-- Chamada manualmente via admin ou trigger
-- ============================================================
create or replace function public.calculate_points(match_uuid uuid)
returns void
language plpgsql
security definer
as $$
declare
  m public.matches%rowtype;
  b public.bets%rowtype;
  pts int;
  scoring jsonb;
begin
  -- Busca o jogo
  select * into m from public.matches where id = match_uuid;

  if m.home_score is null or m.away_score is null then
    raise exception 'Resultado não definido para o jogo %', match_uuid;
  end if;

  -- Para cada aposta do jogo
  for b in
    select * from public.bets where match_id = match_uuid
  loop
    -- Busca pontuação do grupo
    select scoring_system into scoring from public.groups where id = b.group_id;

    pts := 0;

    -- Placar exato
    if b.home_score_bet = m.home_score and b.away_score_bet = m.away_score then
      pts := coalesce((scoring->>'exact')::int, 10);

    -- Acertou vencedor ou empate
    elsif
      (b.home_score_bet > b.away_score_bet and m.home_score > m.away_score) or
      (b.home_score_bet < b.away_score_bet and m.home_score < m.away_score)
    then
      pts := coalesce((scoring->>'winner')::int, 5);

    -- Acertou empate (mas não exato)
    elsif b.home_score_bet = b.away_score_bet and m.home_score = m.away_score then
      pts := coalesce((scoring->>'draw_guess')::int, 3);
    end if;

    -- Atualiza pontos
    update public.bets set points_earned = pts, updated_at = now()
    where id = b.id;
  end loop;

  -- Atualiza status do jogo
  update public.matches set status = 'finished', updated_at = now()
  where id = match_uuid;
end;
$$;

-- ============================================================
-- FUNÇÃO: ranking do grupo
-- ============================================================
create or replace function public.get_group_ranking(group_uuid uuid)
returns table(
  user_id uuid,
  nickname text,
  name text,
  total_points bigint,
  exact_count bigint,
  winner_count bigint,
  bets_count bigint
)
language sql
security definer
as $$
  select
    p.id as user_id,
    p.nickname,
    p.name,
    coalesce(sum(b.points_earned), 0) as total_points,
    count(b.id) filter (where b.points_earned >= 10) as exact_count,
    count(b.id) filter (where b.points_earned = 5) as winner_count,
    count(b.id) as bets_count
  from public.group_members gm
  join public.profiles p on p.id = gm.user_id
  left join public.bets b on b.user_id = gm.user_id and b.group_id = group_uuid
  where gm.group_id = group_uuid
  group by p.id, p.nickname, p.name
  order by total_points desc, exact_count desc;
$$;

-- ============================================================
-- FUNÇÃO: auto-criar profile após signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, name, nickname, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'nickname', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger no signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- VIEW: ranking geral (todos os grupos somados)
-- ============================================================
create view public.global_ranking as
  select
    p.id as user_id,
    p.nickname,
    p.name,
    coalesce(sum(b.points_earned), 0) as total_points,
    count(distinct b.group_id) as groups_count
  from public.profiles p
  left join public.bets b on b.user_id = p.id
  group by p.id, p.nickname, p.name
  order by total_points desc;
