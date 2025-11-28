function getPrefs() { try { return JSON.parse(localStorage.getItem('tea_prefs') || '{}'); } catch { return {}; } }
function savePrefs(p) { localStorage.setItem('tea_prefs', JSON.stringify(p)); }

function applyPrefs() {
  const p = getPrefs();
  const html = document.documentElement;
  html.classList.toggle('contrast-high', !!p.contrast);
  html.classList.toggle('dyslexic', !!p.dyslexic);
  html.classList.toggle('reduce-motion', !!p.reduceMotion);
  html.classList.toggle('calm', !!p.calm);
  const scale = Math.min(130, Math.max(90, Number(p.fontScale || 100)));
  ['font-90','font-100','font-110','font-120','font-130'].forEach(c => html.classList.remove(c));
  html.classList.add('font-' + scale);
  const fontScale = document.getElementById('fontScale');
  if (fontScale) fontScale.value = scale;

  // Atualiza estados ARIA dos botões (melhor feedback de acessibilidade)
  const btnContrast = document.getElementById('toggleContrast');
  const btnDyslexic = document.getElementById('toggleDyslexic');
  const btnMotion = document.getElementById('toggleMotion');
  const btnCalm = document.getElementById('toggleCalm');
  btnContrast?.setAttribute('aria-pressed', !!p.contrast);
  btnDyslexic?.setAttribute('aria-pressed', !!p.dyslexic);
  btnMotion?.setAttribute('aria-pressed', !!p.reduceMotion);
  btnCalm?.setAttribute('aria-pressed', !!p.calm);

  if (p.calm) { ensureCalmOverlay(); } else { destroyCalmOverlay(); }
}

function speak(text) {
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    utter.rate = 0.95;
    speechSynthesis.speak(utter);
  } catch (e) {}
}

function handleCards() {
  document.querySelectorAll('.card').forEach(btn => {
    btn.addEventListener('click', () => speak(btn.dataset.say || btn.textContent.trim()));
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
  });

  const container = document.getElementById('myCards');
  if (!container) return;
  function getCustom() { try { return JSON.parse(localStorage.getItem('tea_cards')||'[]'); } catch { return []; } }
  function saveCustom(list) { localStorage.setItem('tea_cards', JSON.stringify(list)); }
  function render() {
    const list = getCustom();
    container.innerHTML = '';
    list.forEach(c => {
      const b = document.createElement('button');
      b.className = 'card';
      b.setAttribute('role','listitem');
      b.dataset.say = c.text;
      b.innerHTML = (c.emoji || '🙂') + '<span>' + c.text + '</span>';
      b.addEventListener('click', () => speak(c.text));
      container.appendChild(b);
    });
  }
  render();

  const form = document.getElementById('addCardForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emoji = form.emoji.value.trim() || '🙂';
    const text = form.text.value.trim();
    if (!text) return;
    const list = getCustom();
    list.push({ emoji, text });
    saveCustom(list);
    form.reset();
    render();
  });
}

// Respiração 5-4-5
let calmTimer = null;
let calmPhaseIndex = 0;
let countdownInterval = null;
const calmPhases = [
  { label: 'Inspire suavemente (5s)', duration: 5000 },
  { label: 'Segure o ar (4s)', duration: 4000 },
  { label: 'Expire devagar (5s)', duration: 5000 },
];

function ensureCalmOverlay() {
  if (document.getElementById('calmOverlay')) return;
  const overlay = document.createElement('section');
  overlay.className = 'calm-overlay';
  overlay.id = 'calmOverlay';
  overlay.setAttribute('aria-label','Exercício de respiração guiado');
  overlay.innerHTML = `
    <h3>Respire</h3>
    <div class="breath" aria-hidden="true"></div>
    <p id="calmText" class="calm-text" aria-live="polite">Pronto para começar? Toque em Iniciar.</p>
    <p class="calm-text"><strong>Contagem:</strong> <span id="calmCounter">—</span></p>
    <div class="controls">
      <button id="calmStart" class="primary" type="button">Iniciar</button>
      <button id="calmStop" type="button">Parar</button>
      <button id="calmClose" type="button" aria-label="Fechar exercício">Fechar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById('calmStart')?.addEventListener('click', startCalmCycle);
  document.getElementById('calmStop')?.addEventListener('click', stopCalmCycle);
  document.getElementById('calmClose')?.addEventListener('click', () => {
    const prefs = getPrefs();
    prefs.calm = false;
    savePrefs(prefs);
    applyPrefs();
  });
}

function destroyCalmOverlay() {
  stopCalmCycle();
  const el = document.getElementById('calmOverlay');
  if (el) el.remove();
}

function startCalmCycle() {
  stopCalmCycle();
  calmPhaseIndex = 0;
  const textEl = document.getElementById('calmText');
  if (!textEl) return;
  runPhase(textEl);
}

function runPhase(textEl) {
  const phase = calmPhases[calmPhaseIndex % calmPhases.length];
  textEl.textContent = phase.label;
  const counterEl = document.getElementById('calmCounter');
  let remaining = Math.round(phase.duration / 1000);
  if (counterEl) counterEl.textContent = remaining + 's';
  if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
  countdownInterval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      return;
    }
    if (counterEl) counterEl.textContent = remaining + 's';
  }, 1000);

  calmTimer = setTimeout(() => {
    if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
    calmPhaseIndex++;
    runPhase(textEl);
  }, phase.duration);
}

function stopCalmCycle() {
  if (calmTimer) { clearTimeout(calmTimer); calmTimer = null; }
  if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
  const textEl = document.getElementById('calmText');
  if (textEl) textEl.textContent = 'Pronto para começar? Toque em Iniciar.';
  const counterEl = document.getElementById('calmCounter');
  if (counterEl) counterEl.textContent = '—';
}

document.addEventListener('DOMContentLoaded', () => {
  applyPrefs();

  const prefs = Object.assign({ contrast:false, dyslexic:false, reduceMotion:false, calm:false, fontScale:100 }, getPrefs());

  // Ao ativar Alto contraste, desativa Modo calma para evitar paletas escuras conflitantes
  document.getElementById('toggleContrast')?.addEventListener('click', () => {
    prefs.contrast = !prefs.contrast;
    if (prefs.contrast) { prefs.calm = false; }
    savePrefs(prefs);
    applyPrefs();
  });
  document.getElementById('toggleDyslexic')?.addEventListener('click', () => { prefs.dyslexic = !prefs.dyslexic; savePrefs(prefs); applyPrefs(); });
  document.getElementById('toggleMotion')?.addEventListener('click', () => { prefs.reduceMotion = !prefs.reduceMotion; savePrefs(prefs); applyPrefs(); });
  // Ao ativar Modo calma, desativa Alto contraste para preservar a paleta calma
  document.getElementById('toggleCalm')?.addEventListener('click', () => {
    prefs.calm = !prefs.calm;
    if (prefs.calm) { prefs.contrast = false; }
    savePrefs(prefs);
    applyPrefs();
  });
  document.getElementById('fontScale')?.addEventListener('input', (e) => { prefs.fontScale = Number(e.target.value); savePrefs(prefs); applyPrefs(); });
  document.getElementById('readPage')?.addEventListener('click', () => {
    const main = document.getElementById('conteudo');
    const text = main ? main.innerText : document.body.innerText;
    speak(text);
  });

  handleCards();

  // SW para Pages (path relativo)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .catch((err) => console.warn('SW registration failed', err));
    });
  }
});