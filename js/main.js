const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function getStoredTheme() {
  return localStorage.getItem('he4rt-theme');
}

function applyTheme(theme) {
  if (theme === 'light') {
    html.classList.remove('dark');
  } else {
    html.classList.add('dark');
  }
  localStorage.setItem('he4rt-theme', theme);
}

const stored = getStoredTheme();
if (stored) {
  applyTheme(stored);
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  applyTheme('light');
} else {
  applyTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
  themeToggle.classList.add('animate-spin-once');
  setTimeout(() => themeToggle.classList.remove('animate-spin-once'), 300);
});

const totalSteps = 10;
let current = 1;

const steps = document.querySelectorAll('.step');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnSubmit = document.getElementById('btnSubmit');
const progressBar = document.getElementById('progressBar');
const progressContainer = progressBar.closest('[role="progressbar"]');
const currentStepEl = document.getElementById('currentStep');
const percentLabel = document.getElementById('percentLabel');
const form = document.getElementById('triageForm');
const successMsg = document.getElementById('successMsg');

function showStep(n) {
  steps.forEach((s) => {
    s.classList.remove('step-visible');
    s.classList.add('step-hidden');
    s.setAttribute('aria-hidden', 'true');
  });

  const target = document.querySelector(`[data-step="${n}"]`);
  target.classList.remove('step-hidden');
  target.classList.add('step-visible');
  target.removeAttribute('aria-hidden');

  const percent = Math.round((n / totalSteps) * 100);
  progressBar.style.width = percent + '%';
  progressContainer.setAttribute('aria-valuenow', percent);
  currentStepEl.textContent = n;
  percentLabel.textContent = percent + '%';

  btnPrev.classList.toggle('hidden', n === 1);
  btnNext.classList.toggle('hidden', n === totalSteps);
  btnSubmit.classList.toggle('hidden', n !== totalSteps);
  if (n === totalSteps) btnSubmit.classList.remove('hidden');

  const firstInput = target.querySelector('input, select, button');
  if (firstInput) firstInput.focus();
}

btnNext.addEventListener('click', () => {
  if (current < totalSteps) {
    current++;
    showStep(current);
  }
});

btnPrev.addEventListener('click', () => {
  if (current > 1) {
    current--;
    showStep(current);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && e.altKey && current < totalSteps) {
    current++;
    showStep(current);
  }
  if (e.key === 'ArrowLeft' && e.altKey && current > 1) {
    current--;
    showStep(current);
  }
});

const gitRadios = document.querySelectorAll('input[name="git"]');
const gitFallback = document.getElementById('gitFallback');

gitRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    gitFallback.classList.toggle('hidden', radio.value !== 'nenhuma');
  });
});

document.querySelectorAll('.option-pill').forEach((pill) => {
  pill.addEventListener('click', function () {
    this.style.transform = 'scale(0.93)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    if (data[key]) {
      data[key] = Array.isArray(data[key])
        ? [...data[key], value]
        : [data[key], value];
    } else {
      data[key] = value;
    }
  }

  console.log('Dados da triagem:', data);

  form.style.opacity = '0';
  form.style.transform = 'translateY(-10px)';
  form.style.transition = 'all 0.3s ease';

  setTimeout(() => {
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
    successMsg.focus();
  }, 300);
});

steps.forEach((s, i) => {
  if (i > 0) s.setAttribute('aria-hidden', 'true');
});
