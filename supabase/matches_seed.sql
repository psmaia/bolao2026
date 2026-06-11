-- ============================================================
-- SEED: Jogos da Copa do Mundo 2026
-- Todos os horários em UTC. Fonte: fifa.com
-- ATENÇÃO: Verifique e atualize os times após o sorteio.
-- Fase de grupos: times reais. Mata-mata: "A definir".
-- ============================================================

-- Helper para inserir com match_number sequencial
-- Execute após o schema.sql

insert into public.matches (match_number, stage, group_name, home_team, away_team, home_flag, away_flag, venue, city, country, match_date) values

-- ============================================================
-- FASE DE GRUPOS
-- ============================================================

-- GRUPO A
(1,  'group', 'A', 'México',     'Seleção A2',  '🇲🇽', '🏳️', 'Estadio Azteca',            'Cidade do México', 'Mexico',  '2026-06-11 20:00:00+00'),
(2,  'group', 'A', 'Seleção A3', 'Seleção A4',  '🏳️', '🏳️', 'SoFi Stadium',               'Los Angeles',       'USA',     '2026-06-12 00:00:00+00'),
(3,  'group', 'A', 'México',     'Seleção A3',  '🇲🇽', '🏳️', 'Estadio Azteca',            'Cidade do México', 'Mexico',  '2026-06-16 00:00:00+00'),
(4,  'group', 'A', 'Seleção A4', 'Seleção A2',  '🏳️', '🏳️', 'SoFi Stadium',               'Los Angeles',       'USA',     '2026-06-16 20:00:00+00'),
(5,  'group', 'A', 'México',     'Seleção A4',  '🇲🇽', '🏳️', 'Estadio Azteca',            'Cidade do México', 'Mexico',  '2026-06-20 00:00:00+00'),
(6,  'group', 'A', 'Seleção A2', 'Seleção A3',  '🏳️', '🏳️', 'SoFi Stadium',               'Los Angeles',       'USA',     '2026-06-20 00:00:00+00'),

-- GRUPO B
(7,  'group', 'B', 'Argentina',  'Seleção B2',  '🇦🇷', '🏳️', 'MetLife Stadium',            'Nova York',         'USA',     '2026-06-12 20:00:00+00'),
(8,  'group', 'B', 'Seleção B3', 'Seleção B4',  '🏳️', '🏳️', 'AT&T Stadium',               'Dallas',            'USA',     '2026-06-13 00:00:00+00'),
(9,  'group', 'B', 'Argentina',  'Seleção B3',  '🇦🇷', '🏳️', 'MetLife Stadium',            'Nova York',         'USA',     '2026-06-17 00:00:00+00'),
(10, 'group', 'B', 'Seleção B4', 'Seleção B2',  '🏳️', '🏳️', 'AT&T Stadium',               'Dallas',            'USA',     '2026-06-17 20:00:00+00'),
(11, 'group', 'B', 'Argentina',  'Seleção B4',  '🇦🇷', '🏳️', 'MetLife Stadium',            'Nova York',         'USA',     '2026-06-21 00:00:00+00'),
(12, 'group', 'B', 'Seleção B2', 'Seleção B3',  '🏳️', '🏳️', 'AT&T Stadium',               'Dallas',            'USA',     '2026-06-21 00:00:00+00'),

-- GRUPO C
(13, 'group', 'C', 'Estados Unidos', 'Seleção C2', '🇺🇸', '🏳️', 'Levi''s Stadium',           'São Francisco',     'USA',     '2026-06-12 23:00:00+00'),
(14, 'group', 'C', 'Seleção C3',     'Seleção C4', '🏳️', '🏳️', 'Gillette Stadium',           'Boston',            'USA',     '2026-06-13 19:00:00+00'),
(15, 'group', 'C', 'Estados Unidos', 'Seleção C3', '🇺🇸', '🏳️', 'Levi''s Stadium',           'São Francisco',     'USA',     '2026-06-17 23:00:00+00'),
(16, 'group', 'C', 'Seleção C4',     'Seleção C2', '🏳️', '🏳️', 'Gillette Stadium',           'Boston',            'USA',     '2026-06-18 19:00:00+00'),
(17, 'group', 'C', 'Estados Unidos', 'Seleção C4', '🇺🇸', '🏳️', 'Levi''s Stadium',           'São Francisco',     'USA',     '2026-06-22 23:00:00+00'),
(18, 'group', 'C', 'Seleção C2',     'Seleção C3', '🏳️', '🏳️', 'Gillette Stadium',           'Boston',            'USA',     '2026-06-22 23:00:00+00'),

-- GRUPO D
(19, 'group', 'D', 'Brasil',     'Seleção D2',  '🇧🇷', '🏳️', 'Estadio Akron',              'Guadalajara',       'Mexico',  '2026-06-13 23:00:00+00'),
(20, 'group', 'D', 'Seleção D3', 'Seleção D4',  '🏳️', '🏳️', 'BC Place',                   'Vancouver',         'Canada',  '2026-06-14 02:00:00+00'),
(21, 'group', 'D', 'Brasil',     'Seleção D3',  '🇧🇷', '🏳️', 'Estadio Akron',              'Guadalajara',       'Mexico',  '2026-06-18 23:00:00+00'),
(22, 'group', 'D', 'Seleção D4', 'Seleção D2',  '🏳️', '🏳️', 'BC Place',                   'Vancouver',         'Canada',  '2026-06-19 02:00:00+00'),
(23, 'group', 'D', 'Brasil',     'Seleção D4',  '🇧🇷', '🏳️', 'Estadio Akron',              'Guadalajara',       'Mexico',  '2026-06-23 23:00:00+00'),
(24, 'group', 'D', 'Seleção D2', 'Seleção D3',  '🏳️', '🏳️', 'BC Place',                   'Vancouver',         'Canada',  '2026-06-23 23:00:00+00'),

-- GRUPO E
(25, 'group', 'E', 'França',     'Seleção E2',  '🇫🇷', '🏳️', 'Hard Rock Stadium',          'Miami',             'USA',     '2026-06-14 20:00:00+00'),
(26, 'group', 'E', 'Seleção E3', 'Seleção E4',  '🏳️', '🏳️', 'BMO Field',                  'Toronto',           'Canada',  '2026-06-14 23:00:00+00'),
(27, 'group', 'E', 'França',     'Seleção E3',  '🇫🇷', '🏳️', 'Hard Rock Stadium',          'Miami',             'USA',     '2026-06-18 20:00:00+00'),
(28, 'group', 'E', 'Seleção E4', 'Seleção E2',  '🏳️', '🏳️', 'BMO Field',                  'Toronto',           'Canada',  '2026-06-18 23:00:00+00'),
(29, 'group', 'E', 'França',     'Seleção E4',  '🇫🇷', '🏳️', 'Hard Rock Stadium',          'Miami',             'USA',     '2026-06-22 20:00:00+00'),
(30, 'group', 'E', 'Seleção E2', 'Seleção E3',  '🏳️', '🏳️', 'BMO Field',                  'Toronto',           'Canada',  '2026-06-22 20:00:00+00'),

-- GRUPO F
(31, 'group', 'F', 'Espanha',    'Seleção F2',  '🇪🇸', '🏳️', 'NRG Stadium',                'Houston',           'USA',     '2026-06-15 00:00:00+00'),
(32, 'group', 'F', 'Seleção F3', 'Seleção F4',  '🏳️', '🏳️', 'Estadio BBVA',               'Monterrey',         'Mexico',  '2026-06-15 20:00:00+00'),
(33, 'group', 'F', 'Espanha',    'Seleção F3',  '🇪🇸', '🏳️', 'NRG Stadium',                'Houston',           'USA',     '2026-06-19 00:00:00+00'),
(34, 'group', 'F', 'Seleção F4', 'Seleção F2',  '🏳️', '🏳️', 'Estadio BBVA',               'Monterrey',         'Mexico',  '2026-06-19 20:00:00+00'),
(35, 'group', 'F', 'Espanha',    'Seleção F4',  '🇪🇸', '🏳️', 'NRG Stadium',                'Houston',           'USA',     '2026-06-23 00:00:00+00'),
(36, 'group', 'F', 'Seleção F2', 'Seleção F3',  '🏳️', '🏳️', 'Estadio BBVA',               'Monterrey',         'Mexico',  '2026-06-23 00:00:00+00'),

-- GRUPO G
(37, 'group', 'G', 'Portugal',   'Seleção G2',  '🇵🇹', '🏳️', 'Estadio Olímpico',           'Kansas City',       'USA',     '2026-06-15 23:00:00+00'),
(38, 'group', 'G', 'Seleção G3', 'Seleção G4',  '🏳️', '🏳️', 'Estadio Universitario',      'Monterrey',         'Mexico',  '2026-06-16 19:00:00+00'),
(39, 'group', 'G', 'Portugal',   'Seleção G3',  '🇵🇹', '🏳️', 'Estadio Olímpico',           'Kansas City',       'USA',     '2026-06-20 23:00:00+00'),
(40, 'group', 'G', 'Seleção G4', 'Seleção G2',  '🏳️', '🏳️', 'Estadio Universitario',      'Monterrey',         'Mexico',  '2026-06-20 19:00:00+00'),
(41, 'group', 'G', 'Portugal',   'Seleção G4',  '🇵🇹', '🏳️', 'Estadio Olímpico',           'Kansas City',       'USA',     '2026-06-24 23:00:00+00'),
(42, 'group', 'G', 'Seleção G2', 'Seleção G3',  '🏳️', '🏳️', 'Estadio Universitario',      'Monterrey',         'Mexico',  '2026-06-24 23:00:00+00'),

-- GRUPO H
(43, 'group', 'H', 'Alemanha',   'Seleção H2',  '🇩🇪', '🏳️', 'Lincoln Financial Field',    'Filadélfia',        'USA',     '2026-06-16 23:00:00+00'),
(44, 'group', 'H', 'Seleção H3', 'Seleção H4',  '🏳️', '🏳️', 'Estadio Ciudad de México',   'Cidade do México', 'Mexico',  '2026-06-17 19:00:00+00'),
(45, 'group', 'H', 'Alemanha',   'Seleção H3',  '🇩🇪', '🏳️', 'Lincoln Financial Field',    'Filadélfia',        'USA',     '2026-06-21 23:00:00+00'),
(46, 'group', 'H', 'Seleção H4', 'Seleção H2',  '🏳️', '🏳️', 'Estadio Ciudad de México',   'Cidade do México', 'Mexico',  '2026-06-21 19:00:00+00'),
(47, 'group', 'H', 'Alemanha',   'Seleção H4',  '🇩🇪', '🏳️', 'Lincoln Financial Field',    'Filadélfia',        'USA',     '2026-06-25 23:00:00+00'),
(48, 'group', 'H', 'Seleção H2', 'Seleção H3',  '🏳️', '🏳️', 'Estadio Ciudad de México',   'Cidade do México', 'Mexico',  '2026-06-25 23:00:00+00'),

-- GRUPO I
(49, 'group', 'I', 'Inglaterra', 'Seleção I2',  '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🏳️', 'Caesars Superdome',          'Nova Orleans',      'USA',     '2026-06-18 02:00:00+00'),
(50, 'group', 'I', 'Seleção I3', 'Seleção I4',  '🏳️', '🏳️', 'Arrowhead Stadium',          'Kansas City',       'USA',     '2026-06-18 22:00:00+00'),
(51, 'group', 'I', 'Inglaterra', 'Seleção I3',  '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🏳️', 'Caesars Superdome',          'Nova Orleans',      'USA',     '2026-06-22 02:00:00+00'),
(52, 'group', 'I', 'Seleção I4', 'Seleção I2',  '🏳️', '🏳️', 'Arrowhead Stadium',          'Kansas City',       'USA',     '2026-06-22 22:00:00+00'),
(53, 'group', 'I', 'Inglaterra', 'Seleção I4',  '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🏳️', 'Caesars Superdome',          'Nova Orleans',      'USA',     '2026-06-26 02:00:00+00'),
(54, 'group', 'I', 'Seleção I2', 'Seleção I3',  '🏳️', '🏳️', 'Arrowhead Stadium',          'Kansas City',       'USA',     '2026-06-26 02:00:00+00'),

-- GRUPO J
(55, 'group', 'J', 'Seleção J1', 'Seleção J2',  '🏳️', '🏳️', 'Camping World Stadium',      'Orlando',           'USA',     '2026-06-19 02:00:00+00'),
(56, 'group', 'J', 'Seleção J3', 'Seleção J4',  '🏳️', '🏳️', 'BC Place',                   'Vancouver',         'Canada',  '2026-06-19 22:00:00+00'),
(57, 'group', 'J', 'Seleção J1', 'Seleção J3',  '🏳️', '🏳️', 'Camping World Stadium',      'Orlando',           'USA',     '2026-06-23 02:00:00+00'),
(58, 'group', 'J', 'Seleção J4', 'Seleção J2',  '🏳️', '🏳️', 'BC Place',                   'Vancouver',         'Canada',  '2026-06-23 22:00:00+00'),
(59, 'group', 'J', 'Seleção J1', 'Seleção J4',  '🏳️', '🏳️', 'Camping World Stadium',      'Orlando',           'USA',     '2026-06-27 02:00:00+00'),
(60, 'group', 'J', 'Seleção J2', 'Seleção J3',  '🏳️', '🏳️', 'BC Place',                   'Vancouver',         'Canada',  '2026-06-27 02:00:00+00'),

-- GRUPO K
(61, 'group', 'K', 'Seleção K1', 'Seleção K2',  '🏳️', '🏳️', 'Empower Field',              'Denver',            'USA',     '2026-06-20 02:00:00+00'),
(62, 'group', 'K', 'Seleção K3', 'Seleção K4',  '🏳️', '🏳️', 'BMO Field',                  'Toronto',           'Canada',  '2026-06-20 22:00:00+00'),
(63, 'group', 'K', 'Seleção K1', 'Seleção K3',  '🏳️', '🏳️', 'Empower Field',              'Denver',            'USA',     '2026-06-24 02:00:00+00'),
(64, 'group', 'K', 'Seleção K4', 'Seleção K2',  '🏳️', '🏳️', 'BMO Field',                  'Toronto',           'Canada',  '2026-06-24 22:00:00+00'),
(65, 'group', 'K', 'Seleção K1', 'Seleção K4',  '🏳️', '🏳️', 'Empower Field',              'Denver',            'USA',     '2026-06-28 02:00:00+00'),
(66, 'group', 'K', 'Seleção K2', 'Seleção K3',  '🏳️', '🏳️', 'BMO Field',                  'Toronto',           'Canada',  '2026-06-28 02:00:00+00'),

-- GRUPO L
(67, 'group', 'L', 'Seleção L1', 'Seleção L2',  '🏳️', '🏳️', 'Estadio BBVA',               'Monterrey',         'Mexico',  '2026-06-21 02:00:00+00'),
(68, 'group', 'L', 'Seleção L3', 'Seleção L4',  '🏳️', '🏳️', 'Estadio Azteca',             'Cidade do México', 'Mexico',  '2026-06-21 22:00:00+00'),
(69, 'group', 'L', 'Seleção L1', 'Seleção L3',  '🏳️', '🏳️', 'Estadio BBVA',               'Monterrey',         'Mexico',  '2026-06-25 02:00:00+00'),
(70, 'group', 'L', 'Seleção L4', 'Seleção L2',  '🏳️', '🏳️', 'Estadio Azteca',             'Cidade do México', 'Mexico',  '2026-06-25 22:00:00+00'),
(71, 'group', 'L', 'Seleção L1', 'Seleção L4',  '🏳️', '🏳️', 'Estadio BBVA',               'Monterrey',         'Mexico',  '2026-06-29 02:00:00+00'),
(72, 'group', 'L', 'Seleção L2', 'Seleção L3',  '🏳️', '🏳️', 'Estadio Azteca',             'Cidade do México', 'Mexico',  '2026-06-29 02:00:00+00'),

-- ============================================================
-- FASE ELIMINATÓRIA (times a definir)
-- ============================================================

-- OITAVAS (Round of 32 → 16 jogos)
(73, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'MetLife Stadium',        'Nova York',         'USA',     '2026-07-01 20:00:00+00'),
(74, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'AT&T Stadium',           'Dallas',            'USA',     '2026-07-01 00:00:00+00'),
(75, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'SoFi Stadium',           'Los Angeles',       'USA',     '2026-07-02 20:00:00+00'),
(76, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Estadio Azteca',         'Cidade do México', 'Mexico',  '2026-07-02 00:00:00+00'),
(77, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'NRG Stadium',            'Houston',           'USA',     '2026-07-03 20:00:00+00'),
(78, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Levi''s Stadium',        'São Francisco',     'USA',     '2026-07-03 00:00:00+00'),
(79, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Hard Rock Stadium',      'Miami',             'USA',     '2026-07-04 20:00:00+00'),
(80, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'BC Place',               'Vancouver',         'Canada',  '2026-07-04 00:00:00+00'),
(81, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Gillette Stadium',       'Boston',            'USA',     '2026-07-05 20:00:00+00'),
(82, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'BMO Field',              'Toronto',           'Canada',  '2026-07-05 00:00:00+00'),
(83, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Estadio Akron',          'Guadalajara',       'Mexico',  '2026-07-06 20:00:00+00'),
(84, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Lincoln Financial',      'Filadélfia',        'USA',     '2026-07-06 00:00:00+00'),
(85, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Caesars Superdome',      'Nova Orleans',      'USA',     '2026-07-07 20:00:00+00'),
(86, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Estadio BBVA',           'Monterrey',         'Mexico',  '2026-07-07 00:00:00+00'),
(87, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Empower Field',          'Denver',            'USA',     '2026-07-08 20:00:00+00'),
(88, 'r32', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Camping World Stadium',  'Orlando',           'USA',     '2026-07-08 00:00:00+00'),

-- QUARTAS (8 jogos)
(89,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'MetLife Stadium',    'Nova York',         'USA',    '2026-07-11 20:00:00+00'),
(90,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'SoFi Stadium',       'Los Angeles',       'USA',    '2026-07-11 00:00:00+00'),
(91,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'AT&T Stadium',       'Dallas',            'USA',    '2026-07-12 20:00:00+00'),
(92,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'NRG Stadium',        'Houston',           'USA',    '2026-07-12 00:00:00+00'),
(93,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Hard Rock Stadium',  'Miami',             'USA',    '2026-07-13 20:00:00+00'),
(94,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Estadio Azteca',     'Cidade do México', 'Mexico', '2026-07-13 00:00:00+00'),
(95,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'BC Place',           'Vancouver',         'Canada', '2026-07-14 20:00:00+00'),
(96,  'r16', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Levi''s Stadium',    'São Francisco',     'USA',    '2026-07-14 00:00:00+00'),

-- SEMIFINAIS (4 jogos)
(97,  'qf', null, 'A definir', 'A definir', '🏳️', '🏳️', 'MetLife Stadium',   'Nova York',      'USA', '2026-07-15 00:00:00+00'),
(98,  'qf', null, 'A definir', 'A definir', '🏳️', '🏳️', 'AT&T Stadium',      'Dallas',         'USA', '2026-07-15 20:00:00+00'),
(99,  'qf', null, 'A definir', 'A definir', '🏳️', '🏳️', 'SoFi Stadium',      'Los Angeles',    'USA', '2026-07-16 00:00:00+00'),
(100, 'qf', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Hard Rock Stadium', 'Miami',          'USA', '2026-07-16 20:00:00+00'),

-- SEMIFINAIS (2 jogos)
(101, 'sf', null, 'A definir', 'A definir', '🏳️', '🏳️', 'MetLife Stadium',   'Nova York',      'USA', '2026-07-15 00:00:00+00'),
(102, 'sf', null, 'A definir', 'A definir', '🏳️', '🏳️', 'AT&T Stadium',      'Dallas',         'USA', '2026-07-16 00:00:00+00'),

-- TERCEIRO LUGAR
(103, '3rd', null, 'A definir', 'A definir', '🏳️', '🏳️', 'Hard Rock Stadium', 'Miami',          'USA', '2026-07-18 20:00:00+00'),

-- FINAL
(104, 'final', null, 'A definir', 'A definir', '🏳️', '🏳️', 'MetLife Stadium',   'Nova York',      'USA', '2026-07-19 20:00:00+00');

-- NOTA: Atualize os nomes e emojis das seleções via painel admin
-- após confirmar os grupos reais da Copa 2026.
-- Os horários são aproximados — confira em fifa.com e ajuste se necessário.
