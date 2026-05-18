/* ─── Constants ────────────────────────────────────────────────── */
const DIFF_POINTS = { facil: 5, media: 10, pesada: 20, heroica: 30 };
const DIFF_LABELS = { facil: '🟢 Fácil', media: '🟡 Media', pesada: '🟠 Pesada', heroica: '🔴 Heroica' };
const STATUS_LABELS = {
  pendiente:  'Esperando héroe',
  en_proceso: 'En batalla ⚔️',
  completada: '✅ Misión cumplida',
  vencida:    '💀 El caos ganó',
  postergada: '📅 Pateada al futuro',
};
const OWNER_LABELS = { fede: '🧔 Fede', cami: '👩‍🦰 Cami', ambos: '🤝 Ambos' };

const DAILY_MESSAGES = [
  { text: 'El reino agradece tu esfuerzo ⚔️', sub: 'Cada misión cuenta' },
  { text: 'Hoy el caos no va a ganar 🏆', sub: '¡A misionar!' },
  { text: 'La casa sube de nivel 🌟', sub: 'Sigan así, héroes' },
  { text: 'El equipo está imparable 💪', sub: 'Una misión más y se nota' },
  { text: 'El reino espera sus héroes 🏠', sub: 'Hay misiones esperando' },
  { text: 'Hoy se farmea orden 🧹', sub: 'El caos retrocede' },
  { text: 'Un día de gloria en el hogar ✨', sub: 'A completar misiones' },
  { text: 'El desorden no se rinde solo 💫', sub: 'Pero nosotros tampoco' },
];

const MISSION_TEMPLATES = [
  { title: 'Lavar platos',          diff: 'facil',  category: 'Cocina',         icon: '🍽️' },
  { title: 'Sacar basura',           diff: 'facil',  category: 'Rápida',         icon: '🗑️' },
  { title: 'Tender la cama',         diff: 'facil',  category: 'Orden',          icon: '🛏️' },
  { title: 'Barrer',                 diff: 'facil',  category: 'Limpieza',       icon: '🧹' },
  { title: 'Doblar ropa',            diff: 'facil',  category: 'Orden',          icon: '👕' },
  { title: 'Regar plantas',          diff: 'facil',  category: 'Rápida',         icon: '🌱' },
  { title: 'Preparar mate/café',     diff: 'facil',  category: 'Cocina',         icon: '☕' },
  { title: 'Ordenar living',         diff: 'facil',  category: 'Orden',          icon: '🛋️' },
  { title: 'Limpiar baño',           diff: 'media',  category: 'Limpieza',       icon: '🚿' },
  { title: 'Pasar trapo',            diff: 'media',  category: 'Limpieza',       icon: '🧽' },
  { title: 'Preparar cena',          diff: 'media',  category: 'Cocina',         icon: '🍳' },
  { title: 'Hacer compras',          diff: 'pesada', category: 'Compras',        icon: '🛒' },
  { title: 'Cambiar sábanas',        diff: 'pesada', category: 'Limpieza',       icon: '🛏️' },
  { title: 'Limpiar heladera',       diff: 'pesada', category: 'Cocina',         icon: '❄️' },
  { title: 'Ordenar placard',        diff: 'heroica',category: 'Orden',          icon: '🗄️' },
  { title: 'Revisar gastos',         diff: 'media',  category: 'Administrativo', icon: '📊' },
];

const ROULETTE_TASKS = [
  { task: 'Lavar platos',            category: 'Cocina',          diff: 'facil'  },
  { task: 'Preparar cena',           category: 'Cocina',          diff: 'media'  },
  { task: 'Doblar ropa',             category: 'Orden',           diff: 'facil'  },
  { task: 'Ordenar living 10 min',   category: 'Orden',           diff: 'facil'  },
  { task: 'Pasar aspiradora',        category: 'Limpieza',        diff: 'media'  },
  { task: 'Limpiar baño',            category: 'Limpieza',        diff: 'media'  },
  { task: 'Sacar basura',            category: 'Rápida',          diff: 'facil'  },
  { task: 'Hacer compras',           category: 'Compras',         diff: 'pesada' },
  { task: 'Revisar gastos',          category: 'Administrativo',  diff: 'media'  },
  { task: 'Regar plantas',           category: 'Rápida',          diff: 'facil'  },
  { task: 'Cambiar sábanas',         category: 'Limpieza',        diff: 'pesada' },
  { task: 'Limpiar heladera',        category: 'Cocina',          diff: 'pesada' },
  { task: 'Ordenar placard',         category: 'Orden',           diff: 'heroica'},
  { task: 'Fregar piso',             category: 'Limpieza',        diff: 'media'  },
  { task: 'Pedir turno médico',      category: 'Administrativo',  diff: 'facil'  },
  { task: 'Organizar papeles',       category: 'Administrativo',  diff: 'media'  },
];

const REWARDS_PERSONAL = [
  { id: 'r1', icon: '🎬', name: 'Elegís la película',       desc: 'Voto dorado esta noche',           pts: 50  },
  { id: 'r2', icon: '☕', name: 'El otro prepara café/mate', desc: 'Descanso merecido',                pts: 80  },
  { id: 'r3', icon: '🍽️', name: 'Cena elegida por vos',     desc: 'Menú a tu gusto',                  pts: 100 },
  { id: 'r4', icon: '🙅', name: 'Noche sin lavar platos',    desc: 'Una noche de descanso total',      pts: 150 },
  { id: 'r5', icon: '🌙', name: 'Salida/cita pendiente',     desc: 'Te ganaste una salida',            pts: 200 },
  { id: 'r6', icon: '🛋️', name: 'Sofá para vos solo/a',      desc: '2 horas de Netflix sin molestias',pts: 60  },
];
const REWARDS_TEAM = [
  { id: 'rt1', icon: '🍕', name: 'Pedir comida a domicilio', desc: 'Noche sin cocinar juntos',    pts: 120 },
  { id: 'rt2', icon: '🎮', name: 'Noche de juegos',          desc: 'Board games o coop en pareja',pts: 150 },
  { id: 'rt3', icon: '🛁', name: 'Spa day casero',           desc: 'Tarde de relax total',        pts: 200 },
  { id: 'rt4', icon: '🌆', name: 'Salida especial',          desc: 'Cena o plan romántico',       pts: 300 },
];

const BOSS_POOL = [
  { title: 'Ordenar placard',          desc: 'Ropa de temporada, donar lo que no se usa', diff: 'heroica', category: 'Orden'          },
  { title: 'Limpiar heladera',         desc: 'Todo afuera, limpiar bien y reorganizar',   diff: 'pesada',  category: 'Cocina'         },
  { title: 'Organizar papeles',        desc: 'Facturas, documentos, todo en su lugar',    diff: 'pesada',  category: 'Administrativo' },
  { title: 'Orden general de la casa', desc: 'Barrida épica de toda la casa',             diff: 'heroica', category: 'Limpieza'       },
  { title: 'Compras grandes del mes',  desc: 'Supermercado completo con lista',           diff: 'pesada',  category: 'Compras'        },
];

const SPECIAL_EVENTS = [
  { type: 'doble',    icon: '✨', label: '¡Puntos dobles!',      note: 'Esta misión vale el doble',          multiplier: 2 },
  { type: 'express',  icon: '⚡', label: 'Misión Express',        note: 'Solo 10 minutos, sin excusas',       multiplier: 1 },
  { type: 'equipo',   icon: '🤝', label: 'Misión en equipo',      note: 'La hacen juntos y suman los dos',    multiplier: 1 },
  { type: 'descanso', icon: '😴', label: 'Descanso merecido',     note: '+5 pts gratis. El reino reconoce',   multiplier: 1, bonus: 5 },
];

/* ─── State ────────────────────────────────────────────────────── */
let state = {
  currentUser: null,
  missions: [],
  points: { fede: 0, cami: 0 },
  completedThisWeek: { fede: 0, cami: 0 },
  rewardHistory: [],
  weekStart: getWeekStart(),
  dailyChallenge: null,
  comodines: { fede: 1, cami: 1, weekStart: null },
};

let formState = { owner: 'ambos', diff: 'media' };
let currentFilter = 'pendiente';
let currentOwnerFilter = 'todos';
let currentSection = 'dashboard';
let rouletteResult = null;
let spinning = false;
let wheelDeg = 0;
let confirmCallback = null;
let toastTimer = null;

/* ─── Persistence ──────────────────────────────────────────────── */
function save() {
  localStorage.setItem('cvf_state', JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem('cvf_state');
  if (raw) {
    state = { ...state, ...JSON.parse(raw) };
    if (!state.weekStart) state.weekStart = getWeekStart();
    checkWeekReset();
  } else {
    seedData();
  }
}

function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(d.setDate(diff));
  mon.setHours(0, 0, 0, 0);
  return mon.toISOString();
}

function checkWeekReset() {
  const savedWeek = new Date(state.weekStart).toISOString().slice(0, 10);
  const currentWeek = getWeekStart().slice(0, 10);
  if (savedWeek !== currentWeek) {
    state.weekStart = getWeekStart();
    state.completedThisWeek = { fede: 0, cami: 0 };
    state.points = { fede: 0, cami: 0 };
    save();
  }
}

function seedData() {
  const today = new Date();
  const fmt = d => d.toISOString().slice(0, 10);
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

  state.missions = [
    { id: uid(), title: 'Lavar platos',              desc: 'Después de cenar',               diff: 'facil',   pts: 5,  owner: 'cami',  category: 'Cocina',         status: 'pendiente',  date: fmt(today),          created: Date.now() },
    { id: uid(), title: 'Doblar ropa',               desc: 'La que está en el sillón',       diff: 'facil',   pts: 5,  owner: 'fede',  category: 'Orden',          status: 'en_proceso', date: fmt(addDays(today,1)),created: Date.now() },
    { id: uid(), title: 'Sacar basura',              desc: '',                                diff: 'facil',   pts: 5,  owner: 'ambos', category: 'Rápida',         status: 'pendiente',  date: fmt(today),          created: Date.now() },
    { id: uid(), title: 'Ordenar living 10 minutos', desc: 'Almohadones, cosas del sillón',  diff: 'facil',   pts: 5,  owner: 'cami',  category: 'Orden',          status: 'pendiente',  date: fmt(addDays(today,2)),created: Date.now() },
    { id: uid(), title: 'Hacer compras',             desc: 'Lista completa de la semana',     diff: 'pesada',  pts: 20, owner: 'ambos', category: 'Compras',        status: 'pendiente',  date: fmt(addDays(today,3)),created: Date.now() },
    { id: uid(), title: 'Limpiar heladera',          desc: 'Limpiar todo y reorganizar',      diff: 'pesada',  pts: 20, owner: 'fede',  category: 'Cocina',         status: 'pendiente',  date: fmt(addDays(today,5)),created: Date.now() },
    { id: uid(), title: 'Preparar cena especial',    desc: 'Algo rico para el fin de semana', diff: 'media',   pts: 10, owner: 'cami',  category: 'Cocina',         status: 'pendiente',  date: fmt(addDays(today,4)),created: Date.now() },
    { id: uid(), title: 'Revisar gastos del mes',    desc: 'Planilla de gastos actualizada',  diff: 'media',   pts: 10, owner: 'fede',  category: 'Administrativo', status: 'pendiente',  date: fmt(addDays(today,7)),created: Date.now() },
    { id: uid(), title: 'Regar plantas',             desc: '',                                diff: 'facil',   pts: 5,  owner: 'cami',  category: 'Rápida',         status: 'completada', date: fmt(today),          created: Date.now(), completedAt: Date.now() },
    { id: uid(), title: 'Cambiar sábanas',           desc: 'Las del cuarto y del living',     diff: 'pesada',  pts: 20, owner: 'ambos', category: 'Limpieza',       status: 'pendiente',  date: fmt(addDays(today,6)),created: Date.now() },
  ];
  state.points = { fede: 15, cami: 10 };
  state.completedThisWeek = { fede: 2, cami: 1 };
  save();
}

/* ─── Helpers ──────────────────────────────────────────────────── */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function greet() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function isOverdue(m) {
  return m.date && m.date < todayStr() &&
         m.status !== 'completada' &&
         m.status !== 'postergada';
}

function getNextSunday() {
  const d = new Date();
  const days = 7 - d.getDay();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/* ─── Human-readable date ──────────────────────────────────────── */
function fmtDateHuman(dateStr, status) {
  if (!dateStr) return { text: '🧘 Sin apuro', cls: 'date-none' };
  const today = todayStr();
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);
  const readable = fmtDate(dateStr);

  if (status === 'completada') {
    return { text: `✅ Completada`, cls: 'date-done' };
  }
  if (status === 'postergada') {
    return { text: `📅 Pateada para el ${readable}`, cls: 'date-postponed' };
  }
  const overdue = dateStr < today;
  if (overdue) {
    return { text: `💀 Venció el ${readable} — el caos ganó`, cls: 'date-overdue' };
  }
  if (dateStr === today)      return { text: '⏰ Vence hoy',              cls: 'date-urgent' };
  if (dateStr === tomorrowStr) return { text: '📅 Vence mañana',           cls: 'date-soon' };
  return { text: `📅 Vence el ${readable}`, cls: 'date-normal' };
}

/* ─── Daily challenge ──────────────────────────────────────────── */
function getDailyChallenge() {
  const today = todayStr();
  // If we already have a challenge for today, return it
  if (state.dailyChallenge && state.dailyChallenge.date === today) {
    return state.dailyChallenge;
  }
  // Generate new challenge: pick 3 pending missions, or use template names if not enough
  const pending = state.missions.filter(m => m.status === 'pendiente' || m.status === 'en_proceso');
  const shuffled = [...pending].sort(() => Math.random() - .5).slice(0, 3);
  const missionIds = shuffled.map(m => m.id);
  const challenge = { date: today, missionIds, bonusAwarded: false };
  state.dailyChallenge = challenge;
  save();
  return challenge;
}

function checkDailyChallenge() {
  if (!state.dailyChallenge) return;
  if (state.dailyChallenge.bonusAwarded) return;
  if (state.dailyChallenge.date !== todayStr()) return;
  const ids = state.dailyChallenge.missionIds;
  const done = ids.filter(id => {
    const m = state.missions.find(x => x.id === id);
    return m && m.status === 'completada';
  });
  if (done.length >= ids.length && ids.length > 0) {
    state.dailyChallenge.bonusAwarded = true;
    state.points.fede = (state.points.fede || 0) + 20;
    state.points.cami = (state.points.cami || 0) + 20;
    save();
    showToast('🏆 Desafío del día completado! +20 pts para el equipo 🎉');
  }
}

function getDailyChallengeProgress() {
  const ch = getDailyChallenge();
  const ids = ch.missionIds;
  const done = ids.filter(id => {
    const m = state.missions.find(x => x.id === id);
    return m && m.status === 'completada';
  }).length;
  return { total: ids.length, done, bonusAwarded: ch.bonusAwarded };
}

/* ─── Comodines ────────────────────────────────────────────────── */
function resetComodinesIfNewWeek() {
  const week = getWeekStart();
  if (!state.comodines || state.comodines.weekStart !== week) {
    state.comodines = { fede: 1, cami: 1, weekStart: week };
    save();
  }
}

function useComodin() {
  resetComodinesIfNewWeek();
  const u = state.currentUser;
  if (state.comodines[u] <= 0) {
    showToast('😅 Ya usaste tu comodín semanal. El destino manda.');
    return false;
  }
  state.comodines[u] -= 1;
  save();
  showToast('😈 Comodín usado! Girá de nuevo...');
  document.getElementById('roulette-result').classList.remove('show');
  document.getElementById('spin-btn').textContent = 'Girar ruleta 🎲';
  rouletteResult = null;
  updateComodinBtn();
  return true;
}

function updateComodinBtn() {
  resetComodinesIfNewWeek();
  const u = state.currentUser;
  const btn = document.getElementById('comodin-btn');
  if (!btn) return;
  const left = state.comodines[u] || 0;
  btn.disabled = left <= 0;
  btn.textContent = left > 0 ? `😈 Usar comodín (${left} restante)` : '😈 Comodín agotado';
}

/* ─── Navigation ───────────────────────────────────────────────── */
function navigate(section) {
  currentSection = section;

  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + section).classList.add('active');

  document.querySelectorAll('.nav-item, .top-nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.section === section);
  });

  const fab = document.getElementById('fab');
  fab.style.display = section === 'crear' ? 'none' : '';

  // Reset misiones tabs when visiting
  if (section === 'misiones') {
    currentFilter = 'hoy';
    currentOwnerFilter = 'todos';
    // Activate first tab-btn and first owner-chip
    setTimeout(() => {
      const tabs = document.querySelectorAll('.tab-btn');
      tabs.forEach((b, i) => b.classList.toggle('active', i === 0));
      const chips = document.querySelectorAll('.owner-chip');
      chips.forEach((b, i) => b.classList.toggle('active', i === 0));
    }, 0);
  }

  renderSection(section);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSection(section) {
  const renders = {
    dashboard:   renderDashboard,
    misiones:    renderMissions,
    ranking:     renderRanking,
    recompensas: renderRewards,
    crear:       renderTemplates,
  };
  if (renders[section]) renders[section]();
}

/* ─── User ─────────────────────────────────────────────────────── */
function selectUser(user) {
  state.currentUser = user;
  save();
  document.getElementById('user-modal').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  updateUserChip();
  renderDashboard();
}

function changeUser() {
  document.getElementById('user-modal').style.display = 'flex';
}

function updateUserChip() {
  const chip = document.getElementById('top-user-chip');
  if (!chip || !state.currentUser) return;
  const u = state.currentUser;
  chip.className = 'user-chip ' + u;
  chip.textContent = u === 'fede' ? '🧔 Fede' : '👩‍🦰 Cami';
}

/* ─── Dashboard helpers ────────────────────────────────────────── */
function getDailyMessage() {
  const idx = new Date().getDay(); // 0–6, determinista por día
  return DAILY_MESSAGES[idx % DAILY_MESSAGES.length];
}

function getRecommendedMission() {
  const u = state.currentUser;
  const candidates = state.missions.filter(m =>
    (m.status === 'pendiente' || m.status === 'en_proceso') &&
    (m.owner === u || m.owner === 'ambos')
  );
  if (!candidates.length) return null;
  // Priorizar: vencidas > hoy > más antiguas
  candidates.sort((a, b) => {
    const aOver = isOverdue(a) ? 0 : 1;
    const bOver = isOverdue(b) ? 0 : 1;
    if (aOver !== bOver) return aOver - bOver;
    return (a.date || '') < (b.date || '') ? -1 : 1;
  });
  return candidates[0];
}

function getNextTeamReward() {
  const total = state.points.fede + state.points.cami;
  const sorted = [...REWARDS_TEAM].sort((a, b) => a.pts - b.pts);
  return sorted.find(r => r.pts > total) || null;
}

function getPendingCount() {
  return state.missions.filter(m => m.status === 'pendiente' || m.status === 'en_proceso').length;
}

/* ─── Dashboard ────────────────────────────────────────────────── */
function renderDashboard() {
  updateUserChip();
  const u = state.currentUser;
  const uLabel = u === 'fede' ? 'Fede' : 'Cami';
  const uEmoji = u === 'fede' ? '🧔' : '👩‍🦰';
  const msg = getDailyMessage();
  const pending = getPendingCount();

  // ── Hero card
  document.getElementById('hero-card').innerHTML = `
    <div class="hero-greeting">${greet()}, ${uLabel}! ${uEmoji}</div>
    <div class="hero-message">${msg.text}</div>
    <div class="hero-sub">${pending > 0 ? `Hay ${pending} misión${pending > 1 ? 'es' : ''} esperando héroe` : msg.sub}</div>
  `;

  // ── Points trio
  const totalPts = state.points.fede + state.points.cami;
  document.getElementById('points-trio').innerHTML = `
    <div class="trio-card trio-fede">
      <div class="trio-emoji">🧔</div>
      <div class="trio-pts">${state.points.fede}</div>
      <div class="trio-label">Fede</div>
    </div>
    <div class="trio-card trio-team">
      <div class="trio-emoji">🏠</div>
      <div class="trio-pts">${totalPts}</div>
      <div class="trio-label">Equipo</div>
    </div>
    <div class="trio-card trio-cami">
      <div class="trio-emoji">👩‍🦰</div>
      <div class="trio-pts">${state.points.cami}</div>
      <div class="trio-label">Cami</div>
    </div>
  `;

  // ── Misión recomendada
  const rec = getRecommendedMission();
  const recEl = document.getElementById('rec-mission');
  if (rec) {
    const over = isOverdue(rec);
    recEl.innerHTML = `
      <div class="rec-card ${over ? 'rec-urgent' : ''}">
        <div class="rec-tag">${over ? '🔥 ¡Urgente!' : '📌 Hacer ahora'}</div>
        <div class="rec-title">${rec.title}</div>
        <div class="rec-meta">
          <span class="badge badge-diff-${rec.diff}">${DIFF_LABELS[rec.diff]}</span>
          <span class="badge badge-pts">+${rec.pts} pts</span>
          <span class="badge badge-owner-${rec.owner}">${OWNER_LABELS[rec.owner]}</span>
        </div>
        <div class="rec-actions">
          <button class="rec-btn-main" data-action="completada" data-id="${rec.id}">✅ Completar</button>
          <button class="rec-btn-sec"  data-action="en_proceso" data-id="${rec.id}">⚔️ Tomar</button>
        </div>
      </div>
    `;
  } else {
    recEl.innerHTML = `
      <div class="rec-card rec-empty">
        <div class="rec-tag">🎉 Sin misiones urgentes</div>
        <div class="rec-title">El reino está en paz</div>
        <div class="rec-meta"><span class="badge badge-pts">¡Buen trabajo, héroes!</span></div>
      </div>
    `;
  }

  // ── Progreso equipo hacia próxima recompensa
  const nextReward = getNextTeamReward();
  const progEl = document.getElementById('team-reward-progress');
  if (nextReward) {
    const pct = Math.min(100, Math.round((totalPts / nextReward.pts) * 100));
    const faltaN = nextReward.pts - totalPts;
    progEl.innerHTML = `
      <div class="team-progress-card">
        <div class="tp-header">
          <span class="tp-icon">${nextReward.icon}</span>
          <div class="tp-info">
            <div class="tp-title">Próxima recompensa de equipo</div>
            <div class="tp-reward">${nextReward.name}</div>
          </div>
          <div class="tp-pts">${totalPts}/${nextReward.pts}</div>
        </div>
        <div class="progress-bar" style="margin-top:10px">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="tp-note">${faltaN <= 0 ? '🎉 ¡Recompensa desbloqueada!' : `Faltan ${faltaN} pts para desbloquear`}</div>
      </div>
    `;
  } else {
    progEl.innerHTML = `
      <div class="team-progress-card">
        <div class="tp-header">
          <span class="tp-icon">🏆</span>
          <div class="tp-info">
            <div class="tp-title">¡Todas las recompensas desbloqueadas!</div>
            <div class="tp-reward">Son unos campeones 🎉</div>
          </div>
        </div>
      </div>
    `;
  }

  // ── Desafío del día
  renderDailyChallenge();

  // ── Misiones del día (las más urgentes del usuario)
  const todayMissions = state.missions.filter(m =>
    m.status !== 'completada' &&
    (m.date === todayStr() || isOverdue(m)) &&
    (m.owner === u || m.owner === 'ambos')
  ).slice(0, 3);

  const todayEl = document.getElementById('today-missions');
  todayEl.innerHTML = todayMissions.length === 0
    ? `<div class="empty-state"><div class="es-icon">🎉</div><div class="es-text">Sin urgencias para hoy</div><div class="es-sub">¡El reino está tranquilo!</div></div>`
    : todayMissions.map(m => buildMissionCard(m, true)).join('');
}

function renderDailyChallenge() {
  const el = document.getElementById('daily-challenge');
  if (!el) return;
  const prog = getDailyChallengeProgress();
  if (prog.total === 0) { el.innerHTML = ''; return; }
  const pct = Math.round((prog.done / prog.total) * 100);
  const done = prog.bonusAwarded;

  el.innerHTML = `
    <div class="challenge-card ${done ? 'challenge-done' : ''}">
      <div class="challenge-header">
        <div class="challenge-tag">🔥 Desafío del día</div>
        <div class="challenge-reward">+20 pts equipo</div>
      </div>
      <div class="challenge-text">
        ${done
          ? '🏆 ¡El reino sobrevivió otro día! ¡Increíbles!'
          : `Completen ${prog.total} misiones antes de dormir`}
      </div>
      <div class="challenge-progress-row">
        <div class="progress-bar" style="flex:1">
          <div class="progress-fill ${done ? 'fill-green' : ''}" style="width:${pct}%"></div>
        </div>
        <div class="challenge-count">${prog.done}/${prog.total}</div>
      </div>
    </div>
  `;
}

function renderBoss() {
  const bossMission = state.missions.find(m => m.isBoss && m.status !== 'completada');
  const el = document.getElementById('boss-section');

  if (bossMission) {
    el.innerHTML = `
      <div class="boss-card">
        <div class="boss-tag">👾 Boss Semanal</div>
        <div class="boss-title">${bossMission.title}</div>
        <div class="boss-pts">${bossMission.pts} puntos · ${DIFF_LABELS[bossMission.diff]}</div>
        <div class="boss-action">
          <button class="boss-btn" data-action="completada" data-id="${bossMission.id}">Derrotar Boss 💪</button>
          <button class="boss-btn-sec" data-action="en_proceso" data-id="${bossMission.id}">En progreso</button>
        </div>
      </div>
    `;
  } else {
    const boss = BOSS_POOL[Math.floor(Math.random() * BOSS_POOL.length)];
    el.innerHTML = `
      <div class="boss-card">
        <div class="boss-tag">👾 Boss Semanal</div>
        <div class="boss-title">${boss.title}</div>
        <div class="boss-pts">${DIFF_POINTS[boss.diff] + 10} puntos · ${DIFF_LABELS[boss.diff]}</div>
        <div class="boss-action">
          <button class="boss-btn" id="accept-boss-btn">Aceptar Boss 🔥</button>
        </div>
      </div>
    `;
    document.getElementById('accept-boss-btn')?.addEventListener('click', () => addBossMission(boss));
  }
}

function addBossMission(boss) {
  const m = {
    id: uid(),
    title: boss.title,
    desc: boss.desc || '',
    diff: boss.diff,
    pts: DIFF_POINTS[boss.diff] + 10,
    owner: 'ambos',
    category: boss.category,
    status: 'pendiente',
    date: getNextSunday(),
    created: Date.now(),
    isBoss: true,
  };
  state.missions.push(m);
  save();
  showToast('👾 Boss semanal aceptado!');
  renderDashboard();
}

/* ─── Mission card builder ─────────────────────────────────────── */
function buildMissionCard(m, compact = false) {
  const effectiveStatus = (isOverdue(m) && m.status === 'pendiente') ? 'vencida' : m.status;
  const dateInfo = fmtDateHuman(m.date, effectiveStatus);

  // Primary CTA
  let primaryBtn = '';
  let secondaryBtns = '';

  if (effectiveStatus === 'completada') {
    primaryBtn = `<div class="mc-victory">🏆 Victoria lograda</div>`;
  } else if (effectiveStatus === 'vencida') {
    primaryBtn = `<button class="mc-btn mc-btn-complete" data-action="completada" data-id="${m.id}">✅ Completar igual</button>`;
    secondaryBtns = `<button class="mc-btn-sec" data-action="postergada" data-id="${m.id}">📅 Patear</button>`;
  } else if (effectiveStatus === 'en_proceso') {
    primaryBtn = `<button class="mc-btn mc-btn-complete" data-action="completada" data-id="${m.id}">✅ Completar</button>`;
    secondaryBtns = `<button class="mc-btn-sec" data-action="postergada" data-id="${m.id}">📅 Patear</button>`;
  } else if (effectiveStatus === 'postergada') {
    primaryBtn = `<button class="mc-btn mc-btn-take" data-action="pendiente" data-id="${m.id}">⚔️ Retomar</button>`;
    secondaryBtns = `<button class="mc-btn-sec" data-action="completada" data-id="${m.id}">✅ Completar</button>`;
  } else {
    // pendiente
    primaryBtn = `<button class="mc-btn mc-btn-take" data-action="en_proceso" data-id="${m.id}">⚔️ Tomar misión</button>`;
    secondaryBtns = `<button class="mc-btn-sec" data-action="completada" data-id="${m.id}">✅ Completar</button>
                    <button class="mc-btn-sec" data-action="postergada" data-id="${m.id}">📅 Patear</button>`;
  }

  return `
    <div class="mission-card mc-${effectiveStatus}" data-id="${m.id}">

      <div class="mc-header">
        <div class="mc-pts-pill">+${m.pts} pts</div>
        <button class="mc-menu-btn" data-menu="${m.id}" aria-label="Opciones">⋯</button>
        <div class="mc-dropdown" id="menu-${m.id}">
          <button class="mc-drop-item" data-delete="${m.id}">🗑️ Eliminar misión</button>
        </div>
      </div>

      <div class="mc-title">${m.isBoss ? '👾 ' : ''}${m.title}</div>
      ${m.desc ? `<div class="mc-desc">${m.desc}</div>` : ''}

      <div class="mc-badges">
        <span class="badge badge-diff-${m.diff}">${DIFF_LABELS[m.diff]}</span>
        <span class="badge badge-owner-${m.owner}">${OWNER_LABELS[m.owner]}</span>
        ${m.category ? `<span class="badge badge-category">${m.category}</span>` : ''}
      </div>

      <div class="mc-date ${dateInfo.cls}">${dateInfo.text}</div>

      <div class="mc-actions">
        ${primaryBtn}
        ${secondaryBtns ? `<div class="mc-secondary">${secondaryBtns}</div>` : ''}
      </div>

    </div>
  `;
}

/* ─── Mission actions ──────────────────────────────────────────── */
function missionAction(id, newStatus) {
  const m = state.missions.find(x => x.id === id);
  if (!m) return;
  const wasComplete = m.status === 'completada';
  m.status = newStatus;

  if (newStatus === 'completada' && !wasComplete) {
    m.completedAt = Date.now();
    const owners = m.owner === 'ambos' ? ['fede', 'cami'] : [m.owner];
    owners.forEach(o => {
      state.points[o] = (state.points[o] || 0) + m.pts;
      state.completedThisWeek[o] = (state.completedThisWeek[o] || 0) + 1;
    });
    showToast(`🎉 Misión cumplida! +${m.pts} pts`);
  } else if (newStatus === 'en_proceso') {
    showToast('⚔️ En batalla!');
  } else if (newStatus === 'postergada') {
    showToast('📅 Pateada elegantemente');
  }

  save();
  checkDailyChallenge();
  renderSection(currentSection);
  if (currentSection !== 'dashboard') renderDashboard();
}

function deleteMission(id) {
  confirmDialog('🗑️', '¿Eliminar misión?', 'Esta misión desaparecerá del mapa para siempre.', () => {
    state.missions = state.missions.filter(m => m.id !== id);
    save();
    renderSection(currentSection);
    showToast('Misión eliminada');
  });
}

/* ─── Event delegation ─────────────────────────────────────────── */
document.addEventListener('click', (e) => {
  // Action buttons (complete / take / postpone)
  const actionBtn = e.target.closest('[data-action]');
  if (actionBtn) {
    missionAction(actionBtn.dataset.id, actionBtn.dataset.action);
    return;
  }
  // Delete
  const deleteBtn = e.target.closest('[data-delete]');
  if (deleteBtn) {
    deleteMission(deleteBtn.dataset.delete);
    closeAllMenus();
    return;
  }
  // ⋯ menu toggle
  const menuBtn = e.target.closest('[data-menu]');
  if (menuBtn) {
    e.stopPropagation();
    const id = menuBtn.dataset.menu;
    const drop = document.getElementById('menu-' + id);
    const isOpen = drop?.classList.contains('open');
    closeAllMenus();
    if (!isOpen && drop) drop.classList.add('open');
    return;
  }
  // Redeem reward
  const redeemBtn = e.target.closest('.redeem-btn:not(:disabled)');
  if (redeemBtn && redeemBtn.dataset.rewardId) {
    const { rewardId, rewardType, rewardPts, rewardName } = redeemBtn.dataset;
    redeemReward(rewardId, rewardType, parseInt(rewardPts), rewardName);
    return;
  }
  // Click outside → close menus
  closeAllMenus();
});

function closeAllMenus() {
  document.querySelectorAll('.mc-dropdown.open').forEach(d => d.classList.remove('open'));
}

/* ─── Missions list ────────────────────────────────────────────── */
function renderMissions() {
  let list = [...state.missions];
  const today = todayStr();

  // Tab principal
  if (currentFilter === 'hoy') {
    list = list.filter(m =>
      m.status !== 'completada' &&
      m.status !== 'postergada' &&
      (m.date === today || isOverdue(m))
    );
  } else if (currentFilter === 'pendiente') {
    list = list.filter(m => m.status === 'pendiente');
  } else if (currentFilter === 'en_proceso') {
    list = list.filter(m => m.status === 'en_proceso');
  } else if (currentFilter === 'completada') {
    list = list.filter(m => m.status === 'completada');
  } else if (currentFilter === 'postergada') {
    list = list.filter(m => m.status === 'postergada');
  } else if (currentFilter === 'vencida') {
    list = list.filter(m => isOverdue(m) && m.status !== 'completada' && m.status !== 'postergada');
  }

  // Filtro por responsable
  if (currentOwnerFilter === 'equipo') {
    list = list.filter(m => m.owner === 'ambos');
  } else if (currentOwnerFilter !== 'todos') {
    list = list.filter(m => m.owner === currentOwnerFilter || m.owner === 'ambos');
  }

  list.sort((a, b) => {
    // Vencidas primero, después por fecha
    const aOver = isOverdue(a) ? 0 : 1;
    const bOver = isOverdue(b) ? 0 : 1;
    if (aOver !== bOver) return aOver - bOver;
    return (a.date || 'z') < (b.date || 'z') ? -1 : 1;
  });

  // Subtitle
  const subtitleMap = {
    hoy:        `${list.length} misión${list.length !== 1 ? 'es' : ''} para hoy`,
    pendiente:  `${list.length} esperando héroe`,
    en_proceso: `${list.length} en batalla`,
    completada: `${list.length} victoria${list.length !== 1 ? 's' : ''} esta semana`,
    postergada: `${list.length} pateada${list.length !== 1 ? 's' : ''} al futuro`,
    vencida:    `${list.length} vez que el caos ganó`,
  };
  const sub = document.getElementById('missions-subtitle');
  if (sub) sub.textContent = subtitleMap[currentFilter] || 'El reino espera';

  const emptyMsgs = {
    hoy:        { icon: '🌅', text: '¡Sin urgencias para hoy!', sub: 'El reino está tranquilo' },
    pendiente:  { icon: '🎉', text: '¡Sin misiones pendientes!', sub: '¡Impresionante equipo!' },
    en_proceso: { icon: '⚔️', text: 'Nada en batalla aún', sub: 'Tomá una misión y empezá' },
    completada: { icon: '🏆', text: 'Aún no hay victorias', sub: 'Completá una y aparece acá' },
    postergada: { icon: '📅', text: 'Nada pateado 👏', sub: '¡El equipo cumple!' },
    vencida:    { icon: '💀', text: 'Sin misiones vencidas', sub: '¡Equipo sin deudas!' },
  };

  const el = document.getElementById('missions-list');
  if (list.length === 0) {
    const e = emptyMsgs[currentFilter] || { icon: '🏖️', text: 'Sin misiones acá', sub: '¡Aprovechá!' };
    el.innerHTML = `<div class="empty-state"><div class="es-icon">${e.icon}</div><div class="es-text">${e.text}</div><div class="es-sub">${e.sub}</div></div>`;
  } else {
    el.innerHTML = list.map(m => buildMissionCard(m)).join('');
  }
}

function filterMissions(filter, btn) {
  currentFilter = filter;
  // Clear both rows, highlight the clicked button
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.owner-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMissions();
}

function filterOwner(owner, btn) {
  currentOwnerFilter = owner;
  // Reset to default status filter (hoy) if coming from a special chip
  if (currentFilter === 'postergada' || currentFilter === 'vencida') {
    currentFilter = 'hoy';
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  }
  document.querySelectorAll('.owner-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMissions();
}

/* ─── Templates ───────────────────────────────────────────────── */
function renderTemplates() {
  const el = document.getElementById('templates-grid');
  if (!el) return;
  el.innerHTML = MISSION_TEMPLATES.map(t => `
    <button class="template-btn" onclick="quickAddTemplate(${JSON.stringify(t).replace(/"/g, '&quot;')})">
      <span class="tmpl-icon">${t.icon}</span>
      <span class="tmpl-name">${t.title}</span>
      <span class="tmpl-pts">+${DIFF_POINTS[t.diff]}pts</span>
    </button>
  `).join('');
}

function quickAddTemplate(t) {
  const m = {
    id: uid(),
    title: t.title,
    desc: '',
    diff: t.diff,
    pts: DIFF_POINTS[t.diff],
    owner: state.currentUser,
    category: t.category,
    status: 'pendiente',
    date: todayStr(),
    created: Date.now(),
  };
  state.missions.push(m);
  save();
  showToast(`⚡ "${t.title}" agregada!`);
}

/* ─── Create mission form ──────────────────────────────────────── */
function selectOwner(owner) {
  formState.owner = owner;
  document.querySelectorAll('.owner-btn').forEach(b => {
    b.className = 'owner-btn' + (b.dataset.owner === owner ? ` sel-${owner}` : '');
  });
}

function selectDiff(diff) {
  formState.diff = diff;
  document.querySelectorAll('.diff-btn').forEach(b => {
    b.className = 'diff-btn' + (b.dataset.diff === diff ? ` sel-${diff}` : '');
  });
  const ptsInput = document.getElementById('f-pts');
  if (!ptsInput.dataset.manual) {
    document.getElementById('pts-preview-val').textContent = DIFF_POINTS[diff] + ' pts';
  }
}

function initForm() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('f-date').value = tomorrow.toISOString().slice(0, 10);

  const ptsInput = document.getElementById('f-pts');
  ptsInput.addEventListener('input', () => {
    ptsInput.dataset.manual = ptsInput.value ? '1' : '';
    document.getElementById('pts-preview-val').textContent =
      ptsInput.value ? ptsInput.value + ' pts' : DIFF_POINTS[formState.diff] + ' pts';
  });

  selectOwner('ambos');
  selectDiff('media');
}

function saveMission() {
  const title = document.getElementById('f-title').value.trim();
  if (!title) { showToast('⚠️ Poné un nombre a la misión'); return; }

  const ptsInput = document.getElementById('f-pts');
  const pts = ptsInput.value ? parseInt(ptsInput.value) : DIFF_POINTS[formState.diff];

  const m = {
    id: uid(),
    title,
    desc: document.getElementById('f-desc').value.trim(),
    diff: formState.diff,
    pts,
    owner: formState.owner,
    category: document.getElementById('f-category').value,
    status: 'pendiente',
    date: document.getElementById('f-date').value,
    created: Date.now(),
  };

  state.missions.push(m);
  save();
  showToast('🚀 Misión creada!');

  document.getElementById('f-title').value = '';
  document.getElementById('f-desc').value = '';
  ptsInput.value = '';
  ptsInput.dataset.manual = '';
  document.getElementById('pts-preview-val').textContent = DIFF_POINTS[formState.diff] + ' pts';

  navigate('misiones');
}

/* ─── Roulette ─────────────────────────────────────────────────── */
let rouletteSpecialEvent = null;

function spinRoulette() {
  if (spinning) return;
  spinning = true;
  rouletteSpecialEvent = null;

  const btn = document.getElementById('spin-btn');
  btn.disabled = true;
  btn.textContent = 'El destino decide… 🌀';
  document.getElementById('roulette-result').classList.remove('show');

  const extra = 1440 + Math.random() * 720;
  wheelDeg += extra;
  const wheel = document.getElementById('roulette-wheel');
  wheel.style.transform = `rotate(${wheelDeg}deg)`;

  // 15% chance de evento especial
  if (Math.random() < 0.15) {
    rouletteSpecialEvent = SPECIAL_EVENTS[Math.floor(Math.random() * SPECIAL_EVENTS.length)];
  }

  rouletteResult = ROULETTE_TASKS[Math.floor(Math.random() * ROULETTE_TASKS.length)];

  setTimeout(() => {
    spinning = false;
    btn.disabled = false;
    btn.textContent = 'Girar otra vez 🎲';
    showRouletteResult(rouletteResult);
  }, 3100);
}

function showRouletteResult(task) {
  const basePts = DIFF_POINTS[task.diff];
  const multiplier = rouletteSpecialEvent?.multiplier || 1;
  const finalPts = basePts * multiplier + (rouletteSpecialEvent?.bonus || 0);

  document.getElementById('result-reveal').textContent = 'El destino eligió…';
  document.getElementById('result-category').textContent = task.category;
  document.getElementById('result-task').textContent = task.task;
  document.getElementById('result-meta').innerHTML = `
    <span class="badge badge-diff-${task.diff}">${DIFF_LABELS[task.diff]}</span>
    <span class="badge badge-pts">+${finalPts} pts</span>
    <span class="badge badge-owner-${state.currentUser}">${OWNER_LABELS[state.currentUser]}</span>
  `;

  const eventEl = document.getElementById('result-special');
  if (rouletteSpecialEvent) {
    eventEl.innerHTML = `
      <div class="special-event-badge">
        ${rouletteSpecialEvent.icon} ${rouletteSpecialEvent.label}
        <span class="special-note">${rouletteSpecialEvent.note}</span>
      </div>
    `;
    eventEl.style.display = 'block';
  } else {
    eventEl.style.display = 'none';
  }

  updateComodinBtn();
  document.getElementById('roulette-result').classList.add('show');
}

function acceptRouletteTask() {
  if (!rouletteResult) return;
  const basePts = DIFF_POINTS[rouletteResult.diff];
  const multiplier = rouletteSpecialEvent?.multiplier || 1;
  const finalPts = basePts * multiplier + (rouletteSpecialEvent?.bonus || 0);
  const owner = rouletteSpecialEvent?.type === 'equipo' ? 'ambos' : state.currentUser;

  // Evento "descanso" = bonus de puntos directos sin misión
  if (rouletteSpecialEvent?.type === 'descanso') {
    state.points[state.currentUser] = (state.points[state.currentUser] || 0) + finalPts;
    save();
    showToast(`😴 Descanso merecido! +${finalPts} pts directos 🎉`);
    document.getElementById('roulette-result').classList.remove('show');
    document.getElementById('spin-btn').textContent = 'Girar ruleta 🎲';
    rouletteResult = null;
    rouletteSpecialEvent = null;
    renderDashboard();
    return;
  }

  const m = {
    id: uid(),
    title: rouletteResult.task,
    desc: `Asignada por la ruleta 🎲${rouletteSpecialEvent ? ' · ' + rouletteSpecialEvent.label : ''}`,
    diff: rouletteResult.diff,
    pts: finalPts,
    owner,
    category: rouletteResult.category,
    status: 'pendiente',
    date: todayStr(),
    created: Date.now(),
  };
  state.missions.push(m);
  save();
  showToast(`✅ ¡Misión aceptada! +${finalPts} pts al completar`);
  document.getElementById('roulette-result').classList.remove('show');
  document.getElementById('spin-btn').textContent = 'Girar ruleta 🎲';
  rouletteResult = null;
  rouletteSpecialEvent = null;
}

function acceptAsTeam() {
  if (!rouletteResult) return;
  // Forzar owner = ambos
  const m = {
    id: uid(),
    title: rouletteResult.task,
    desc: 'Misión en equipo — asignada por la ruleta 🤝',
    diff: rouletteResult.diff,
    pts: DIFF_POINTS[rouletteResult.diff],
    owner: 'ambos',
    category: rouletteResult.category,
    status: 'pendiente',
    date: todayStr(),
    created: Date.now(),
  };
  state.missions.push(m);
  save();
  showToast('🤝 ¡Misión de equipo aceptada!');
  document.getElementById('roulette-result').classList.remove('show');
  rouletteResult = null;
  rouletteSpecialEvent = null;
}

/* ─── Ranking ──────────────────────────────────────────────────── */
function getRankTitle(pts) {
  if (pts >= 200) return 'Leyenda del hogar 🏆';
  if (pts >= 120) return 'Héroe doméstico ⭐';
  if (pts >= 60)  return 'Guerrero de la casa ⚔️';
  if (pts >= 20)  return 'Aprendiz dedicado 📚';
  return 'Recién empieza 🌱';
}

function getMostAvoided() {
  const pending = state.missions.filter(m => m.status === 'pendiente' || m.status === 'postergada');
  if (!pending.length) return null;
  pending.sort((a, b) => (a.date || '') < (b.date || '') ? -1 : 1);
  return pending[0]?.title || null;
}

function renderRanking() {
  const fp = state.points.fede;
  const cp = state.points.cami;
  const fc = state.completedThisWeek.fede || 0;
  const cc = state.completedThisWeek.cami || 0;
  const total = fp + cp;
  const winner = fp > cp ? 'fede' : cp > fp ? 'cami' : null;

  let html = `
    <div class="team-card">
      <div class="team-tag">⚡ Equipo Casa — Esta semana</div>
      <div class="team-pts">${total}</div>
      <div class="team-label">puntos en equipo</div>
      <div class="team-sub">${fc + cc} misiones completadas juntos 🏠</div>
    </div>
  `;

  if (winner) {
    const wName = winner === 'fede' ? 'Fede' : 'Cami';
    const diff = Math.abs(fp - cp);
    html += `
      <div class="winner-banner">
        <div>
          <div class="winner-tag">Líder de la semana</div>
          <div class="winner-name">${winner === 'fede' ? '🧔' : '👩‍🦰'} ${wName}</div>
          <div class="winner-desc">${diff} pts de ventaja</div>
        </div>
        <div class="winner-emoji">🥇</div>
      </div>
    `;
  } else if (total > 0) {
    html += `
      <div class="winner-banner">
        <div>
          <div class="winner-tag">Esta semana</div>
          <div class="winner-name">🤝 Empate épico</div>
          <div class="winner-desc">¡Equipo imbatible!</div>
        </div>
        <div class="winner-emoji">🏅</div>
      </div>
    `;
  }

  html += buildRankCard('fede', fp, fc, 'fede-av', '🧔', 'clr-fede');
  html += buildRankCard('cami', cp, cc, 'cami-av', '👩‍🦰', 'clr-cami');

  const avoided = getMostAvoided();
  if (avoided) {
    html += `
      <div class="card card-sm" style="margin-top:4px">
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px">Misión más evitada 😅</div>
        <div style="font-size:15px;font-weight:700">${avoided}</div>
      </div>
    `;
  }

  document.getElementById('ranking-content').innerHTML = html;
}

function buildRankCard(name, pts, completed, avatarClass, emoji, colorClass) {
  const avg = completed > 0 ? Math.round(pts / completed) : 0;
  return `
    <div class="rank-card">
      <div class="rank-header">
        <div class="rank-avatar ${avatarClass}">${emoji}</div>
        <div>
          <div class="rank-name">${name === 'fede' ? 'Fede' : 'Cami'}</div>
          <div class="rank-title">${getRankTitle(pts)}</div>
        </div>
      </div>
      <div class="rank-stats">
        <div class="rank-stat">
          <div class="rank-stat-val ${colorClass}">${pts}</div>
          <div class="rank-stat-label">Puntos</div>
        </div>
        <div class="rank-stat">
          <div class="rank-stat-val clr-gold">${completed}</div>
          <div class="rank-stat-label">Misiones</div>
        </div>
        <div class="rank-stat">
          <div class="rank-stat-val ${colorClass}">${avg}</div>
          <div class="rank-stat-label">Avg/misión</div>
        </div>
      </div>
    </div>
  `;
}

/* ─── Rewards ──────────────────────────────────────────────────── */
function renderRewards() {
  const u = state.currentUser;
  const myPts = state.points[u] || 0;
  const totalPts = state.points.fede + state.points.cami;

  document.getElementById('my-pts-bar').innerHTML = `
    <div class="mypb-label">Tus puntos disponibles</div>
    <div class="mypb-val">${myPts} pts</div>
  `;

  document.getElementById('rewards-personal').innerHTML = REWARDS_PERSONAL.map(r => {
    const can = myPts >= r.pts;
    return `
      <div class="reward-card">
        <div class="reward-icon">${r.icon}</div>
        <div class="reward-info">
          <div class="reward-name">${r.name}</div>
          <div class="reward-desc">${r.desc}</div>
        </div>
        <div class="reward-right">
          <div class="reward-pts-badge">${r.pts} pts</div>
          <button class="redeem-btn" ${can ? '' : 'disabled'}
            data-reward-id="${r.id}" data-reward-type="personal"
            data-reward-pts="${r.pts}" data-reward-name="${r.name}">
            ${can ? 'Canjear' : `Faltan ${r.pts - myPts}`}
          </button>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('rewards-team').innerHTML = REWARDS_TEAM.map(r => {
    const can = totalPts >= r.pts;
    return `
      <div class="reward-card reward-shared">
        <div class="reward-icon">${r.icon}</div>
        <div class="reward-info">
          <div class="reward-name">${r.name}</div>
          <div class="reward-desc">${r.desc} · Entre los dos</div>
        </div>
        <div class="reward-right">
          <div class="reward-pts-badge">${r.pts} pts</div>
          <button class="redeem-btn" ${can ? '' : 'disabled'}
            data-reward-id="${r.id}" data-reward-type="team"
            data-reward-pts="${r.pts}" data-reward-name="${r.name}">
            ${can ? 'Canjear' : `Faltan ${r.pts - totalPts}`}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function redeemReward(id, type, pts, name) {
  const msg = type === 'personal'
    ? `Se descontarán ${pts} pts de tus puntos personales.`
    : `Se descontarán ${pts} pts entre los dos.`;

  confirmDialog('🎁', `¿Canjear "${name}"?`, msg, () => {
    if (type === 'personal') {
      state.points[state.currentUser] = Math.max(0, (state.points[state.currentUser] || 0) - pts);
    } else {
      const total = state.points.fede + state.points.cami;
      if (total > 0) {
        const fedeShare = Math.round(pts * (state.points.fede / total));
        state.points.fede = Math.max(0, state.points.fede - fedeShare);
        state.points.cami = Math.max(0, state.points.cami - (pts - fedeShare));
      }
    }
    state.rewardHistory.push({ id, name, pts, type, redeemedAt: Date.now(), by: state.currentUser });
    save();
    showToast(`🎉 ¡"${name}" canjeada!`);
    renderRewards();
    renderDashboard();
  });
}

/* ─── Toast ────────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ─── Confirm dialog ───────────────────────────────────────────── */
function confirmDialog(icon, title, msg, onConfirm) {
  document.getElementById('confirm-icon').textContent = icon;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  confirmCallback = onConfirm;
  document.getElementById('confirm-modal').classList.add('show');
  document.getElementById('confirm-yes').onclick = () => {
    closeConfirm();
    onConfirm();
  };
}

function closeConfirm() {
  document.getElementById('confirm-modal').classList.remove('show');
  confirmCallback = null;
}

/* ─── Init ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  load();
  initForm();
  resetComodinesIfNewWeek();

  if (state.currentUser) {
    document.getElementById('user-modal').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    updateUserChip();
    renderDashboard();
  }
});
