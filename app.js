/* ─── Constants ────────────────────────────────────────────────── */
const DIFF_POINTS = { facil: 5, media: 10, pesada: 20, heroica: 30 };
const DIFF_LABELS = { facil: '🟢 Fácil', media: '🟡 Media', pesada: '🟠 Pesada', heroica: '🔴 Heroica' };
const STATUS_LABELS = {
  pendiente:  'Esperando héroe',
  en_proceso: 'En batalla',
  completada: 'Misión cumplida',
  vencida:    'Se pudrió todo',
  postergada: 'Pateada elegantemente',
};
const OWNER_LABELS = { fede: '🧔 Fede', cami: '👩‍🦰 Cami', ambos: '🤝 Ambos' };

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

/* ─── State ────────────────────────────────────────────────────── */
let state = {
  currentUser: null,
  missions: [],
  points: { fede: 0, cami: 0 },
  completedThisWeek: { fede: 0, cami: 0 },
  rewardHistory: [],
  weekStart: getWeekStart(),
};

let formState = { owner: 'ambos', diff: 'media' };
let currentFilter = 'todas';
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

  renderSection(section);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSection(section) {
  const renders = {
    dashboard:   renderDashboard,
    misiones:    renderMissions,
    ranking:     renderRanking,
    recompensas: renderRewards,
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

/* ─── Dashboard ────────────────────────────────────────────────── */
function renderDashboard() {
  updateUserChip();
  const u = state.currentUser;
  const uLabel = u === 'fede' ? 'Fede' : 'Cami';

  document.getElementById('greeting').innerHTML = `
    <div class="greeting-name">${greet()}, ${uLabel}! ${u === 'fede' ? '🧔' : '👩‍🦰'}</div>
    <div class="greeting-sub">Equipo Casa está en marcha. ¡A misionar!</div>
  `;

  const totalPts = state.points.fede + state.points.cami;
  const weekGoal = 100;
  const pct = Math.min(100, Math.round((totalPts / weekGoal) * 100));

  document.getElementById('points-grid').innerHTML = `
    <div class="points-card fede-card">
      <div class="pc-icon">🧔</div>
      <div class="pc-label">Fede</div>
      <div class="pc-pts">${state.points.fede}</div>
      <div class="pc-sub">pts esta semana</div>
    </div>
    <div class="points-card cami-card">
      <div class="pc-icon">👩‍🦰</div>
      <div class="pc-label">Cami</div>
      <div class="pc-pts">${state.points.cami}</div>
      <div class="pc-sub">pts esta semana</div>
    </div>
  `;

  document.getElementById('weekly-progress').innerHTML = `
    <div class="progress-label">
      <span class="progress-title">⚡ Meta semanal del equipo</span>
      <span class="progress-val">${totalPts}/${weekGoal} pts</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="progress-note">
      ${pct >= 100
        ? '🎉 ¡Meta alcanzada! Recompensa de equipo desbloqueada'
        : `Faltan ${weekGoal - totalPts} pts para la meta del equipo`}
    </div>
  `;

  renderBoss();

  const todayMissions = state.missions.filter(m =>
    m.status !== 'completada' &&
    (m.date === todayStr() || isOverdue(m)) &&
    (m.owner === u || m.owner === 'ambos')
  ).slice(0, 4);

  const todayEl = document.getElementById('today-missions');
  todayEl.innerHTML = todayMissions.length === 0
    ? `<div class="empty-state"><div class="es-icon">🎉</div><div class="es-text">Sin misiones urgentes hoy</div><div class="es-sub">¡Buen trabajo, héroe!</div></div>`
    : todayMissions.map(m => buildMissionCard(m, true)).join('');
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
  const status = (isOverdue(m) && m.status === 'pendiente') ? 'vencida' : m.status;
  const isComplete = m.status === 'completada';

  const actions = isComplete ? '' : `
    <div class="mission-actions">
      ${m.status !== 'en_proceso' ? `<button class="action-btn btn-process" data-action="en_proceso" data-id="${m.id}">⚔️ En batalla</button>` : ''}
      <button class="action-btn btn-complete" data-action="completada" data-id="${m.id}">✅ Completar</button>
      ${m.status !== 'postergada' ? `<button class="action-btn btn-postpone" data-action="postergada" data-id="${m.id}">📅 Patear</button>` : ''}
      ${!compact ? `<button class="action-btn btn-delete" data-delete="${m.id}">🗑️</button>` : ''}
    </div>
  `;

  return `
    <div class="mission-card" data-id="${m.id}">
      <div class="mission-top">
        <div class="mission-info">
          <div class="mission-title">${m.isBoss ? '👾 ' : ''}${m.title}</div>
          ${m.desc ? `<div class="mission-desc">${m.desc}</div>` : ''}
        </div>
        <div class="mission-pts-badge">${m.pts}p</div>
      </div>
      <div class="mission-meta">
        <span class="badge badge-status-${status}">${STATUS_LABELS[status] || status}</span>
        <span class="badge badge-diff-${m.diff}">${DIFF_LABELS[m.diff]}</span>
        <span class="badge badge-owner-${m.owner}">${OWNER_LABELS[m.owner]}</span>
        ${m.category ? `<span class="badge badge-category">${m.category}</span>` : ''}
        ${m.date ? `<span class="mission-date">📅 ${fmtDate(m.date)}</span>` : ''}
      </div>
      ${actions}
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

/* ─── Event delegation for mission cards ──────────────────────── */
document.addEventListener('click', (e) => {
  const actionBtn = e.target.closest('[data-action]');
  if (actionBtn) {
    missionAction(actionBtn.dataset.id, actionBtn.dataset.action);
    return;
  }
  const deleteBtn = e.target.closest('[data-delete]');
  if (deleteBtn) {
    deleteMission(deleteBtn.dataset.delete);
    return;
  }
});

/* ─── Missions list ────────────────────────────────────────────── */
function renderMissions() {
  let list = [...state.missions];

  if (currentFilter !== 'todas') {
    if (['fede', 'cami', 'ambos'].includes(currentFilter)) {
      list = list.filter(m => m.owner === currentFilter);
    } else if (currentFilter === 'vencida') {
      list = list.filter(m => isOverdue(m) && m.status !== 'completada' && m.status !== 'postergada');
    } else {
      list = list.filter(m => m.status === currentFilter);
    }
  }

  list.sort((a, b) => {
    if (a.status === 'completada' && b.status !== 'completada') return 1;
    if (a.status !== 'completada' && b.status === 'completada') return -1;
    return (a.date || '') < (b.date || '') ? -1 : 1;
  });

  const el = document.getElementById('missions-list');
  el.innerHTML = list.length === 0
    ? `<div class="empty-state"><div class="es-icon">🏖️</div><div class="es-text">Sin misiones en esta categoría</div><div class="es-sub">¡Aprovechá y descansá!</div></div>`
    : list.map(m => buildMissionCard(m)).join('');
}

function filterMissions(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderMissions();
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
function spinRoulette() {
  if (spinning) return;
  spinning = true;

  const btn = document.getElementById('spin-btn');
  btn.disabled = true;
  btn.textContent = 'Girando… 🌀';
  document.getElementById('roulette-result').classList.remove('show');

  const extra = 1440 + Math.random() * 720;
  wheelDeg += extra;
  const wheel = document.getElementById('roulette-wheel');
  wheel.style.transform = `rotate(${wheelDeg}deg)`;

  rouletteResult = ROULETTE_TASKS[Math.floor(Math.random() * ROULETTE_TASKS.length)];

  setTimeout(() => {
    spinning = false;
    btn.disabled = false;
    btn.textContent = 'Girar otra vez 🎲';
    showRouletteResult(rouletteResult);
  }, 3100);
}

function showRouletteResult(task) {
  document.getElementById('result-category').textContent = task.category;
  document.getElementById('result-task').textContent = task.task;
  document.getElementById('result-meta').innerHTML = `
    <span class="badge badge-diff-${task.diff}">${DIFF_LABELS[task.diff]}</span>
    <span class="badge badge-pts">+${DIFF_POINTS[task.diff]} pts</span>
  `;
  document.getElementById('roulette-result').classList.add('show');
}

function acceptRouletteTask() {
  if (!rouletteResult) return;
  const m = {
    id: uid(),
    title: rouletteResult.task,
    desc: 'Asignada por la ruleta 🎰',
    diff: rouletteResult.diff,
    pts: DIFF_POINTS[rouletteResult.diff],
    owner: state.currentUser,
    category: rouletteResult.category,
    status: 'pendiente',
    date: todayStr(),
    created: Date.now(),
  };
  state.missions.push(m);
  save();
  showToast('✅ Misión aceptada! ¡Buena suerte!');
  document.getElementById('roulette-result').classList.remove('show');
  document.getElementById('spin-btn').textContent = 'Girar ruleta 🎲';
  rouletteResult = null;
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

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.redeem-btn:not(:disabled)');
  if (!btn || !btn.dataset.rewardId) return;
  const { rewardId, rewardType, rewardPts, rewardName } = btn.dataset;
  redeemReward(rewardId, rewardType, parseInt(rewardPts), rewardName);
});

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

  if (state.currentUser) {
    document.getElementById('user-modal').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    updateUserChip();
    renderDashboard();
  }

  state.missions.forEach(m => {
    if (isOverdue(m) && m.status === 'pendiente') { /* auto-flag handled in render */ }
  });
});
