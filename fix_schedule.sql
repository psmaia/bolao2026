-- Copa 2026 - Correção de datas e horários
-- Nomes dos times conforme cadastrado no banco
-- Horários em UTC (Brasília + 3h)

-- GRUPO A
UPDATE matches SET match_date = '2026-06-11 19:00:00+00' WHERE home_team ILIKE '%xico%' AND away_team ILIKE '%frica%';
UPDATE matches SET match_date = '2026-06-12 02:00:00+00' WHERE home_team ILIKE '%oreia%' AND away_team ILIKE '%checa%';
UPDATE matches SET match_date = '2026-06-18 16:00:00+00' WHERE home_team ILIKE '%checa%' AND away_team ILIKE '%frica%';
UPDATE matches SET match_date = '2026-06-19 01:00:00+00' WHERE home_team ILIKE '%xico%' AND away_team ILIKE '%oreia%';
UPDATE matches SET match_date = '2026-06-25 01:00:00+00' WHERE home_team ILIKE '%checa%' AND away_team ILIKE '%xico%';
UPDATE matches SET match_date = '2026-06-25 01:00:00+00' WHERE home_team ILIKE '%frica%' AND away_team ILIKE '%oreia%';

-- GRUPO B
UPDATE matches SET match_date = '2026-06-12 19:00:00+00' WHERE home_team ILIKE '%canad%' AND away_team ILIKE '%snia%';
UPDATE matches SET match_date = '2026-06-13 19:00:00+00' WHERE home_team ILIKE '%atar%' AND away_team ILIKE '%su%a%';
UPDATE matches SET match_date = '2026-06-18 19:00:00+00' WHERE home_team ILIKE '%canad%' AND away_team ILIKE '%atar%';
UPDATE matches SET match_date = '2026-06-18 22:00:00+00' WHERE home_team ILIKE '%su%a%' AND away_team ILIKE '%snia%';
UPDATE matches SET match_date = '2026-06-24 19:00:00+00' WHERE home_team ILIKE '%canad%' AND away_team ILIKE '%su%a%';
UPDATE matches SET match_date = '2026-06-24 19:00:00+00' WHERE home_team ILIKE '%snia%' AND away_team ILIKE '%atar%';

-- GRUPO C
UPDATE matches SET match_date = '2026-06-13 22:00:00+00' WHERE home_team ILIKE '%rasil%' AND away_team ILIKE '%arrocos%';
UPDATE matches SET match_date = '2026-06-14 01:00:00+00' WHERE home_team ILIKE '%aiti%' AND away_team ILIKE '%c%cia%';
UPDATE matches SET match_date = '2026-06-19 22:00:00+00' WHERE home_team ILIKE '%rasil%' AND away_team ILIKE '%c%cia%';
UPDATE matches SET match_date = '2026-06-20 00:30:00+00' WHERE home_team ILIKE '%arrocos%' AND away_team ILIKE '%aiti%';
UPDATE matches SET match_date = '2026-06-24 22:00:00+00' WHERE home_team ILIKE '%rasil%' AND away_team ILIKE '%aiti%';
UPDATE matches SET match_date = '2026-06-24 22:00:00+00' WHERE home_team ILIKE '%c%cia%' AND away_team ILIKE '%arrocos%';

-- GRUPO D
UPDATE matches SET match_date = '2026-06-13 01:00:00+00' WHERE home_team ILIKE '%estados%' AND away_team ILIKE '%paraguai%';
UPDATE matches SET match_date = '2026-06-14 04:00:00+00' WHERE home_team ILIKE '%ustr%lia%' AND away_team ILIKE '%urquia%';
UPDATE matches SET match_date = '2026-06-19 19:00:00+00' WHERE home_team ILIKE '%estados%' AND away_team ILIKE '%urquia%';
UPDATE matches SET match_date = '2026-06-20 03:00:00+00' WHERE home_team ILIKE '%paraguai%' AND away_team ILIKE '%ustr%lia%';
UPDATE matches SET match_date = '2026-06-26 02:00:00+00' WHERE home_team ILIKE '%estados%' AND away_team ILIKE '%ustr%lia%';
UPDATE matches SET match_date = '2026-06-26 02:00:00+00' WHERE home_team ILIKE '%urquia%' AND away_team ILIKE '%paraguai%';

-- GRUPO E
UPDATE matches SET match_date = '2026-06-14 17:00:00+00' WHERE home_team ILIKE '%lemanha%' AND away_team ILIKE '%ura%ao%';
UPDATE matches SET match_date = '2026-06-14 23:00:00+00' WHERE home_team ILIKE '%marfim%' AND away_team ILIKE '%quador%';
UPDATE matches SET match_date = '2026-06-20 20:00:00+00' WHERE home_team ILIKE '%lemanha%' AND away_team ILIKE '%quador%';
UPDATE matches SET match_date = '2026-06-21 00:00:00+00' WHERE home_team ILIKE '%ura%ao%' AND away_team ILIKE '%marfim%';
UPDATE matches SET match_date = '2026-06-25 20:00:00+00' WHERE home_team ILIKE '%lemanha%' AND away_team ILIKE '%marfim%';
UPDATE matches SET match_date = '2026-06-25 20:00:00+00' WHERE home_team ILIKE '%quador%' AND away_team ILIKE '%ura%ao%';

-- GRUPO F
UPDATE matches SET match_date = '2026-06-14 20:00:00+00' WHERE home_team ILIKE '%baixos%' AND away_team ILIKE '%jap%o%';
UPDATE matches SET match_date = '2026-06-15 02:00:00+00' WHERE home_team ILIKE '%su%cia%' AND away_team ILIKE '%tun%sia%';
UPDATE matches SET match_date = '2026-06-20 17:00:00+00' WHERE home_team ILIKE '%baixos%' AND away_team ILIKE '%tun%sia%';
UPDATE matches SET match_date = '2026-06-21 04:00:00+00' WHERE home_team ILIKE '%jap%o%' AND away_team ILIKE '%su%cia%';
UPDATE matches SET match_date = '2026-06-25 23:00:00+00' WHERE home_team ILIKE '%baixos%' AND away_team ILIKE '%su%cia%';
UPDATE matches SET match_date = '2026-06-25 23:00:00+00' WHERE home_team ILIKE '%jap%o%' AND away_team ILIKE '%tun%sia%';

-- GRUPO G
UPDATE matches SET match_date = '2026-06-15 19:00:00+00' WHERE home_team ILIKE '%lg%ca%' AND away_team ILIKE '%egito%';
UPDATE matches SET match_date = '2026-06-16 01:00:00+00' WHERE home_team = 'Irã' AND away_team ILIKE '%zel%ndia%';
UPDATE matches SET match_date = '2026-06-21 19:00:00+00' WHERE home_team ILIKE '%lg%ca%' AND away_team ILIKE '%zel%ndia%';
UPDATE matches SET match_date = '2026-06-22 01:00:00+00' WHERE home_team ILIKE '%egito%' AND away_team = 'Irã';
UPDATE matches SET match_date = '2026-06-27 03:00:00+00' WHERE home_team ILIKE '%lg%ca%' AND away_team = 'Irã';
UPDATE matches SET match_date = '2026-06-27 03:00:00+00' WHERE home_team ILIKE '%zel%ndia%' AND away_team ILIKE '%egito%';

-- GRUPO H
UPDATE matches SET match_date = '2026-06-15 16:00:00+00' WHERE home_team ILIKE '%espanha%' AND away_team ILIKE '%cabo%';
UPDATE matches SET match_date = '2026-06-15 22:00:00+00' WHERE home_team ILIKE '%r%bia%' AND away_team ILIKE '%uruguai%';
UPDATE matches SET match_date = '2026-06-21 16:00:00+00' WHERE home_team ILIKE '%espanha%' AND away_team ILIKE '%r%bia%';
UPDATE matches SET match_date = '2026-06-21 22:00:00+00' WHERE home_team ILIKE '%uruguai%' AND away_team ILIKE '%cabo%';
UPDATE matches SET match_date = '2026-06-27 00:00:00+00' WHERE home_team ILIKE '%uruguai%' AND away_team ILIKE '%espanha%';
UPDATE matches SET match_date = '2026-06-27 00:00:00+00' WHERE home_team ILIKE '%cabo%' AND away_team ILIKE '%r%bia%';

-- GRUPO I
UPDATE matches SET match_date = '2026-06-16 19:00:00+00' WHERE home_team ILIKE '%fran%a%' AND away_team ILIKE '%senegal%';
UPDATE matches SET match_date = '2026-06-16 22:00:00+00' WHERE home_team ILIKE '%iraque%' AND away_team ILIKE '%noruega%';
UPDATE matches SET match_date = '2026-06-22 21:00:00+00' WHERE home_team ILIKE '%fran%a%' AND away_team ILIKE '%iraque%';
UPDATE matches SET match_date = '2026-06-23 00:00:00+00' WHERE home_team ILIKE '%noruega%' AND away_team ILIKE '%senegal%';
UPDATE matches SET match_date = '2026-06-26 19:00:00+00' WHERE home_team ILIKE '%noruega%' AND away_team ILIKE '%fran%a%';
UPDATE matches SET match_date = '2026-06-26 19:00:00+00' WHERE home_team ILIKE '%senegal%' AND away_team ILIKE '%iraque%';

-- GRUPO J
UPDATE matches SET match_date = '2026-06-17 01:00:00+00' WHERE home_team ILIKE '%argentina%' AND away_team ILIKE '%arg%lia%';
UPDATE matches SET match_date = '2026-06-17 04:00:00+00' WHERE home_team ILIKE '%ustria%' AND away_team ILIKE '%ord%nia%';
UPDATE matches SET match_date = '2026-06-22 17:00:00+00' WHERE home_team ILIKE '%argentina%' AND away_team ILIKE '%ustria%';
UPDATE matches SET match_date = '2026-06-23 03:00:00+00' WHERE home_team ILIKE '%ord%nia%' AND away_team ILIKE '%arg%lia%';
UPDATE matches SET match_date = '2026-06-28 02:00:00+00' WHERE home_team ILIKE '%ord%nia%' AND away_team ILIKE '%argentina%';
UPDATE matches SET match_date = '2026-06-28 02:00:00+00' WHERE home_team ILIKE '%arg%lia%' AND away_team ILIKE '%ustria%';

-- GRUPO K
UPDATE matches SET match_date = '2026-06-17 17:00:00+00' WHERE home_team ILIKE '%portugal%' AND away_team ILIKE '%congo%';
UPDATE matches SET match_date = '2026-06-18 02:00:00+00' WHERE home_team ILIKE '%uzbequist%' AND away_team ILIKE '%col%mbia%';
UPDATE matches SET match_date = '2026-06-23 17:00:00+00' WHERE home_team ILIKE '%portugal%' AND away_team ILIKE '%uzbequist%';
UPDATE matches SET match_date = '2026-06-24 02:00:00+00' WHERE home_team ILIKE '%col%mbia%' AND away_team ILIKE '%congo%';
UPDATE matches SET match_date = '2026-06-27 23:30:00+00' WHERE home_team ILIKE '%col%mbia%' AND away_team ILIKE '%portugal%';
UPDATE matches SET match_date = '2026-06-27 23:30:00+00' WHERE home_team ILIKE '%congo%' AND away_team ILIKE '%uzbequist%';

-- GRUPO L
UPDATE matches SET match_date = '2026-06-17 20:00:00+00' WHERE home_team ILIKE '%inglat%' AND away_team ILIKE '%cro%cia%';
UPDATE matches SET match_date = '2026-06-17 23:00:00+00' WHERE home_team ILIKE '%gana%' AND away_team ILIKE '%panam%';
UPDATE matches SET match_date = '2026-06-23 20:00:00+00' WHERE home_team ILIKE '%inglat%' AND away_team ILIKE '%gana%';
UPDATE matches SET match_date = '2026-06-23 23:00:00+00' WHERE home_team ILIKE '%panam%' AND away_team ILIKE '%cro%cia%';
UPDATE matches SET match_date = '2026-06-27 21:00:00+00' WHERE home_team ILIKE '%panam%' AND away_team ILIKE '%inglat%';
UPDATE matches SET match_date = '2026-06-27 21:00:00+00' WHERE home_team ILIKE '%cro%cia%' AND away_team ILIKE '%gana%';
