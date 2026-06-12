// Dicionário de traduções leve (PT/ES) para a interface do Bolão 2026.
// Não traduz dados de partidas (seleções, estádios, cidades) — esses
// permanecem em português, pois são majoritariamente nomes próprios.

export type Locale = 'pt' | 'es'

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

export const DEFAULT_LOCALE: Locale = 'pt'

type Dict = Record<string, string>

const pt: Dict = {
  // navegação
  'nav.agenda': 'Agenda',
  'nav.myGroups': 'Meus Grupos',
  'nav.profile': 'Perfil',
  'nav.signOut': 'Sair',
  'nav.signIn': 'Entrar',

  // home / agenda
  'home.title': '⚽ Copa do Mundo 2026',
  'home.subtitle': 'Agenda completa · Horários no seu fuso · Bolão com amigos',
  'home.timezoneLabel': 'Horários em:',
  'home.live': 'AO VIVO',
  'home.finished': 'Encerrado',
  'home.stageAll': 'Todos',
  'home.groupLabel': 'Grupo {{g}}',
  'stage.group': 'Fase de Grupos',
  'stage.r32': 'Oitavas',
  'stage.r16': 'Quartas',
  'stage.qf': 'Quartas',
  'stage.sf': 'Semifinais',
  'stage.3rd': '3º Lugar',
  'stage.final': 'Final',
  'date.finished': 'encerrado',
  'date.today': 'hoje',
  'date.tomorrow': 'amanhã',
  'date.inDays': 'em {{n}} dias',

  // login
  'login.title': 'Bolão 2026',
  'login.subtitle': 'Entre para apostar com seus amigos',
  'login.google': 'Entrar com Google',
  'login.googleLoading': 'Entrando...',
  'login.footer': 'Bolão apenas por diversão — sem transações financeiras.',
  'login.errorGoogle': 'Erro ao entrar com Google',

  // entrar em grupo
  'entrar.title': 'Entrar em um grupo',
  'entrar.subtitle': 'Digite o código que você recebeu',
  'entrar.button': 'Entrar no grupo',
  'entrar.loading': 'Entrando...',
  'entrar.errorCode': 'Código inválido',
  'entrar.errorJoin': 'Erro ao entrar no grupo',
  'entrar.welcome': 'Bem-vindo ao grupo "{{name}}"!',

  // lista de grupos
  'groups.title': 'Meus Grupos',
  'groups.pendingInvites': 'Convites pendentes ({{count}})',
  'groups.inviteFor': 'Convite para',
  'groups.defaultGroup': 'um grupo',
  'groups.viewGroup': 'Ver grupo',
  'groups.haveCode': 'Tenho o código',
  'groups.yourGroup': 'Seu grupo',
  'groups.member': 'Membro',
  'groups.emptyTitle': 'Você ainda não tem grupos',
  'groups.emptySubtitle': 'Crie um grupo e convide seus amigos para o bolão!',
  'groups.newGroup': '+ Novo grupo',

  // criar grupo
  'createGroup.title': 'Criar grupo de bolão',
  'createGroup.nameLabel': 'Nome do grupo *',
  'createGroup.namePlaceholder': 'ex: Família Silva...',
  'createGroup.descLabel': 'Descrição (opcional)',
  'createGroup.descPlaceholder': 'ex: a combinação fica entre vocês',
  'createGroup.cancel': 'Cancelar',
  'createGroup.submit': 'Criar grupo',
  'createGroup.creating': 'Criando...',
  'createGroup.errorAuth': 'Você precisa estar logado',
  'createGroup.errorCreate': 'Erro ao criar grupo: {{msg}}',
  'createGroup.success': 'Grupo criado!',

  // página do grupo
  'group.code': 'Código:',
  'group.ranking': '🏆 Ranking',
  'group.scoring': 'Pontuação:',
  'group.exactScore': '🎯 Placar exato:',
  'group.winner': '✅ Vencedor:',
  'group.draw': '🤝 Empate:',
  'group.participants': 'Participantes ({{count}})',
  'group.myBets': 'Minhas Apostas',

  // convite
  'invite.button': 'Convidar',
  'invite.modalTitle': 'Convidar para o grupo',
  'invite.codeLabel': 'Código do grupo',
  'invite.copy': 'Copiar',
  'invite.copyLink': 'Copiar link de convite',
  'invite.whatsapp': 'Convidar pelo WhatsApp',
  'invite.whatsappHint': 'Abre o WhatsApp com o código e o link prontos — você escolhe o contato e envia.',
  'invite.codeCopied': 'Código copiado!',
  'invite.linkCopied': 'Link copiado!',
  'invite.message': 'Bora apostar comigo no Bolão 2026? ⚽🏆\n\nEntra no meu grupo usando o código *{{code}}* ou direto pelo link:\n{{link}}',

  // participantes
  'members.empty': 'Nenhum participante encontrado.',
  'members.owner': '👑 Dono',
  'members.member': 'Membro',
  'members.you': ' (você)',
  'members.since': 'desde {{date}}',
  'members.defaultPlayer': 'Jogador',

  // apostas
  'bets.noneAvailable': 'Nenhum jogo disponível para apostar.',
  'bets.closeInfo': 'Apostas encerram quando o jogo começa · {{tz}}',
  'bets.urgentWarning': 'Você tem {{count}} {{game}} nas próximas 48h sem palpite{{extra}}!',
  'bets.normalWarning': 'Você ainda não apostou em {{count}} {{games}} disponíveis.',
  'bets.game': 'jogo que começa',
  'bets.games': 'jogos que começam',
  'bets.gameSimple': 'jogo',
  'bets.gamesSimple': 'jogos',
  'bets.andMore': ' (e mais {{count}} no total)',
  'bets.noBet': '⏳ sem palpite',
  'bets.betCount': '👥 {{betCount}}/{{memberCount}} apostaram',
  'bets.update': 'Atualizar',
  'bets.bet': 'Apostar',
  'bets.finishedGames': 'Jogos encerrados',
  'bets.yourBet': 'Aposta:',
  'bets.noBetShort': 'Sem aposta',
  'bets.saved': 'Aposta salva!',
  'bets.errorSave': 'Erro ao salvar',
  'bets.pts': 'pts',

  // ranking
  'ranking.title': '🏆 Ranking — {{group}}',
  'ranking.empty': 'Nenhuma aposta ainda.',
  'ranking.position': 'Você está em {{pos}}º lugar com {{pts}} pts',
  'ranking.colPlayer': 'Jogador',
  'ranking.colBets': 'Apostas',
  'ranking.colPts': 'Pts',
  'ranking.back': '← Voltar',

  // card de compartilhar
  'share.button': '📲 Compartilhar meu resultado',
  'share.generating': 'Gerando imagem...',
  'share.title': 'Meu resultado no Bolão 2026',
  'share.text': 'Tô em {{medal}} no Bolão 2026 com {{points}} pontos no grupo "{{group}}"! ⚽🏆\n\nBora apostar também?',
  'share.downloaded': 'Imagem baixada! Agora é só compartilhar 📲',
  'share.errorGenerate': 'Não foi possível gerar a imagem',
  'share.errorGenerateLater': 'Não foi possível gerar a imagem agora',
  'share.medal': '{{n}}º lugar',
  'share.point': 'ponto',
  'share.points': 'pontos',

  // perfil
  'profile.title': 'Meu Perfil',
  'profile.changePhotoHint': 'Toque na foto para alterar · JPG ou PNG, até 3MB',
  'profile.changePhoto': 'Trocar foto',
  'profile.uploading': 'Enviando...',
  'profile.email': 'Email',
  'profile.emailHint': 'O email não pode ser alterado.',
  'profile.name': 'Nome completo *',
  'profile.namePlaceholder': 'Seu nome',
  'profile.nickname': 'Apelido *',
  'profile.nicknamePlaceholder': 'Como vai aparecer no ranking',
  'profile.nicknameHint': 'Sem espaços. Ex: paulinho, ze_futebol',
  'profile.phone': 'Celular (opcional)',
  'profile.marketingLabel': 'Quero receber comunicados e novidades sobre o Bolão 2026 no futuro.',
  'profile.save': 'Salvar alterações',
  'profile.saving': 'Salvando...',
  'profile.errorRequired': 'Nome e apelido são obrigatórios',
  'profile.successSaved': 'Perfil atualizado!',
  'profile.errorSaved': 'Erro ao salvar: {{msg}}',
  'profile.errorImageType': 'Selecione um arquivo de imagem',
  'profile.errorImageSize': 'Imagem muito grande (máx. 3MB)',
  'profile.errorUpload': 'Erro ao enviar imagem: {{msg}}',
  'profile.errorAvatarSave': 'Erro ao salvar foto: {{msg}}',
  'profile.successAvatar': 'Foto de perfil atualizada!',

  // bem-vindo / T&C
  'welcome.title': 'Bem-vindo ao Bolão 2026!',
  'welcome.subtitle': 'Antes de começar, alguns avisos importantes:',
  'welcome.p1': '<strong>É um produto gratuito.</strong> O Bolão 2026 é feito por diversão, sem fins lucrativos, e não cobra nada de ninguém para participar.',
  'welcome.p2': '<strong>Sem garantia de funcionamento.</strong> Não garantimos disponibilidade contínua, estabilidade ou ausência de erros — a plataforma pode ficar fora do ar, passar por manutenções ou apresentar instabilidades a qualquer momento, sem aviso prévio.',
  'welcome.p3': '<strong>Não envolvemos dinheiro.</strong> A plataforma não aceita, recebe, processa ou intermedeia pagamentos de nenhum tipo. Se alguém entrar em contato pedindo dinheiro, PIX ou qualquer forma de pagamento "em nome do Bolão 2026", <strong>não é da plataforma</strong> — não realize o pagamento e desconfie. Eventuais combinados financeiros entre participantes (ex: vaquinhas para o vencedor) são de responsabilidade exclusiva dos próprios usuários, sem qualquer participação ou responsabilidade da plataforma.',
  'welcome.acceptLabel': 'Li e aceito os <strong>Termos & Condições</strong> acima.',
  'welcome.optInLabel': 'Aceito receber comunicados e novidades sobre o Bolão 2026 no futuro (opcional — você pode mudar de ideia depois no seu perfil).',
  'welcome.continue': 'Entendi, vamos lá!',
  'welcome.saving': 'Só um instante...',
  'welcome.hint': 'Marque a primeira caixa para continuar.',
  'welcome.errorSave': 'Não consegui salvar sua preferência agora, mas você já pode continuar.',

  // seletor de idioma
  'lang.toggle': 'Idioma',
}

const es: Dict = {
  'nav.agenda': 'Calendario',
  'nav.myGroups': 'Mis Grupos',
  'nav.profile': 'Perfil',
  'nav.signOut': 'Salir',
  'nav.signIn': 'Iniciar sesión',

  'home.title': '⚽ Copa Mundial 2026',
  'home.subtitle': 'Calendario completo · Horarios en tu zona horaria · Quiniela con amigos',
  'home.timezoneLabel': 'Horarios en:',
  'home.live': 'EN VIVO',
  'home.finished': 'Finalizado',
  'home.stageAll': 'Todos',
  'home.groupLabel': 'Grupo {{g}}',
  'stage.group': 'Fase de Grupos',
  'stage.r32': 'Octavos',
  'stage.r16': 'Cuartos',
  'stage.qf': 'Cuartos',
  'stage.sf': 'Semifinales',
  'stage.3rd': '3.er puesto',
  'stage.final': 'Final',
  'date.finished': 'finalizado',
  'date.today': 'hoy',
  'date.tomorrow': 'mañana',
  'date.inDays': 'en {{n}} días',

  'login.title': 'Quiniela 2026',
  'login.subtitle': 'Inicia sesión para apostar con tus amigos',
  'login.google': 'Iniciar sesión con Google',
  'login.googleLoading': 'Iniciando sesión...',
  'login.footer': 'Quiniela solo por diversión — sin transacciones financieras.',
  'login.errorGoogle': 'Error al iniciar sesión con Google',

  'entrar.title': 'Unirte a un grupo',
  'entrar.subtitle': 'Ingresa el código que recibiste',
  'entrar.button': 'Unirme al grupo',
  'entrar.loading': 'Uniéndome...',
  'entrar.errorCode': 'Código inválido',
  'entrar.errorJoin': 'Error al unirte al grupo',
  'entrar.welcome': '¡Bienvenido al grupo "{{name}}"!',

  'groups.title': 'Mis Grupos',
  'groups.pendingInvites': 'Invitaciones pendientes ({{count}})',
  'groups.inviteFor': 'Invitación para',
  'groups.defaultGroup': 'un grupo',
  'groups.viewGroup': 'Ver grupo',
  'groups.haveCode': 'Tengo el código',
  'groups.yourGroup': 'Tu grupo',
  'groups.member': 'Miembro',
  'groups.emptyTitle': 'Todavía no tienes grupos',
  'groups.emptySubtitle': '¡Crea un grupo e invita a tus amigos a la quiniela!',
  'groups.newGroup': '+ Nuevo grupo',

  'createGroup.title': 'Crear grupo de quiniela',
  'createGroup.nameLabel': 'Nombre del grupo *',
  'createGroup.namePlaceholder': 'ej: Familia Silva...',
  'createGroup.descLabel': 'Descripción (opcional)',
  'createGroup.descPlaceholder': 'ej: el arreglo queda entre ustedes',
  'createGroup.cancel': 'Cancelar',
  'createGroup.submit': 'Crear grupo',
  'createGroup.creating': 'Creando...',
  'createGroup.errorAuth': 'Debes iniciar sesión',
  'createGroup.errorCreate': 'Error al crear el grupo: {{msg}}',
  'createGroup.success': '¡Grupo creado!',

  'group.code': 'Código:',
  'group.ranking': '🏆 Ranking',
  'group.scoring': 'Puntuación:',
  'group.exactScore': '🎯 Resultado exacto:',
  'group.winner': '✅ Ganador:',
  'group.draw': '🤝 Empate:',
  'group.participants': 'Participantes ({{count}})',
  'group.myBets': 'Mis Apuestas',

  'invite.button': 'Invitar',
  'invite.modalTitle': 'Invitar al grupo',
  'invite.codeLabel': 'Código del grupo',
  'invite.copy': 'Copiar',
  'invite.copyLink': 'Copiar enlace de invitación',
  'invite.whatsapp': 'Invitar por WhatsApp',
  'invite.whatsappHint': 'Abre WhatsApp con el código y el enlace listos — tú eliges el contacto y lo envías.',
  'invite.codeCopied': '¡Código copiado!',
  'invite.linkCopied': '¡Enlace copiado!',
  'invite.message': '¿Vamos a apostar juntos en la Quiniela 2026? ⚽🏆\n\nEntra a mi grupo usando el código *{{code}}* o directo por el enlace:\n{{link}}',

  'members.empty': 'No se encontraron participantes.',
  'members.owner': '👑 Dueño',
  'members.member': 'Miembro',
  'members.you': ' (tú)',
  'members.since': 'desde {{date}}',
  'members.defaultPlayer': 'Jugador',

  'bets.noneAvailable': 'No hay partidos disponibles para apostar.',
  'bets.closeInfo': 'Las apuestas cierran cuando empieza el partido · {{tz}}',
  'bets.urgentWarning': 'Tienes {{count}} {{game}} en las próximas 48h sin pronóstico{{extra}}!',
  'bets.normalWarning': 'Todavía no apostaste en {{count}} {{games}} disponibles.',
  'bets.game': 'partido que empieza',
  'bets.games': 'partidos que empiezan',
  'bets.gameSimple': 'partido',
  'bets.gamesSimple': 'partidos',
  'bets.andMore': ' (y {{count}} más en total)',
  'bets.noBet': '⏳ sin pronóstico',
  'bets.betCount': '👥 {{betCount}}/{{memberCount}} ya apostaron',
  'bets.update': 'Actualizar',
  'bets.bet': 'Apostar',
  'bets.finishedGames': 'Partidos finalizados',
  'bets.yourBet': 'Tu apuesta:',
  'bets.noBetShort': 'Sin apuesta',
  'bets.saved': '¡Apuesta guardada!',
  'bets.errorSave': 'Error al guardar',
  'bets.pts': 'pts',

  'ranking.title': '🏆 Ranking — {{group}}',
  'ranking.empty': 'Aún no hay apuestas.',
  'ranking.position': 'Estás en el {{pos}}.º lugar con {{pts}} pts',
  'ranking.colPlayer': 'Jugador',
  'ranking.colBets': 'Apuestas',
  'ranking.colPts': 'Pts',
  'ranking.back': '← Volver',

  'share.button': '📲 Compartir mi resultado',
  'share.generating': 'Generando imagen...',
  'share.title': 'Mi resultado en la Quiniela 2026',
  'share.text': '¡Estoy en {{medal}} en la Quiniela 2026 con {{points}} puntos en el grupo "{{group}}"! ⚽🏆\n\n¿Vienes a apostar también?',
  'share.downloaded': '¡Imagen descargada! Ahora solo compártela 📲',
  'share.errorGenerate': 'No se pudo generar la imagen',
  'share.errorGenerateLater': 'No se pudo generar la imagen ahora',
  'share.medal': '{{n}}.º lugar',
  'share.point': 'punto',
  'share.points': 'puntos',

  'profile.title': 'Mi Perfil',
  'profile.changePhotoHint': 'Toca la foto para cambiarla · JPG o PNG, hasta 3MB',
  'profile.changePhoto': 'Cambiar foto',
  'profile.uploading': 'Subiendo...',
  'profile.email': 'Correo electrónico',
  'profile.emailHint': 'El correo no se puede cambiar.',
  'profile.name': 'Nombre completo *',
  'profile.namePlaceholder': 'Tu nombre',
  'profile.nickname': 'Apodo *',
  'profile.nicknamePlaceholder': 'Cómo aparecerás en el ranking',
  'profile.nicknameHint': 'Sin espacios. Ej: pablito, juan_futbol',
  'profile.phone': 'Celular (opcional)',
  'profile.marketingLabel': 'Quiero recibir novedades sobre la Quiniela 2026 en el futuro.',
  'profile.save': 'Guardar cambios',
  'profile.saving': 'Guardando...',
  'profile.errorRequired': 'Nombre y apodo son obligatorios',
  'profile.successSaved': '¡Perfil actualizado!',
  'profile.errorSaved': 'Error al guardar: {{msg}}',
  'profile.errorImageType': 'Selecciona un archivo de imagen',
  'profile.errorImageSize': 'Imagen demasiado grande (máx. 3MB)',
  'profile.errorUpload': 'Error al subir imagen: {{msg}}',
  'profile.errorAvatarSave': 'Error al guardar la foto: {{msg}}',
  'profile.successAvatar': '¡Foto de perfil actualizada!',

  'welcome.title': '¡Bienvenido a la Quiniela 2026!',
  'welcome.subtitle': 'Antes de empezar, algunos avisos importantes:',
  'welcome.p1': '<strong>Es un producto gratuito.</strong> La Quiniela 2026 se hace por diversión, sin fines de lucro, y no cobra nada a nadie por participar.',
  'welcome.p2': '<strong>Sin garantía de funcionamiento.</strong> No garantizamos disponibilidad continua, estabilidad ni ausencia de errores — la plataforma puede estar fuera de servicio, pasar por mantenimientos o presentar fallas en cualquier momento, sin previo aviso.',
  'welcome.p3': '<strong>No manejamos dinero.</strong> La plataforma no acepta, recibe, procesa ni intermedia pagos de ningún tipo. Si alguien te contacta pidiendo dinero o cualquier forma de pago "en nombre de la Quiniela 2026", <strong>no es de la plataforma</strong> — no realices el pago y desconfía. Cualquier acuerdo financiero entre participantes (por ejemplo, una colecta para el ganador) es responsabilidad exclusiva de los propios usuarios, sin participación ni responsabilidad de la plataforma.',
  'welcome.acceptLabel': 'He leído y acepto los <strong>Términos y Condiciones</strong> anteriores.',
  'welcome.optInLabel': 'Acepto recibir novedades sobre la Quiniela 2026 en el futuro (opcional — puedes cambiar de opinión luego en tu perfil).',
  'welcome.continue': '¡Entendido, vamos!',
  'welcome.saving': 'Un momento...',
  'welcome.hint': 'Marca la primera casilla para continuar.',
  'welcome.errorSave': 'No pude guardar tu preferencia ahora, pero ya puedes continuar.',

  'lang.toggle': 'Idioma',
}

const DICTS: Record<Locale, Dict> = { pt, es }

/** Substitui placeholders {{var}} pelos valores informados. */
function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => (vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`))
}

/** Tradução pura — usável tanto em componentes quanto em código server-side, dado o locale. */
export function translate(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const dict = DICTS[locale] || DICTS[DEFAULT_LOCALE]
  const template = dict[key] ?? DICTS[DEFAULT_LOCALE][key] ?? key
  return interpolate(template, vars)
}

export function stageLabel(stage: string, locale: Locale = DEFAULT_LOCALE): string {
  return translate(locale, `stage.${stage}`) !== `stage.${stage}` ? translate(locale, `stage.${stage}`) : stage
}
