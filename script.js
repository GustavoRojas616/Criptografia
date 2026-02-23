// ══════════════════════════════════════════════
// NAV TOGGLE (mobile)
// ══════════════════════════════════════════════
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Nav shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 40
    ? '0 4px 30px rgba(0,0,0,0.6)'
    : 'none';
}, { passive: true });

// ══════════════════════════════════════════════
// CIPHER TEXT ANIMATION (hero)
// ══════════════════════════════════════════════
const cipherEl = document.getElementById('cipherText');
const cipherStrings = [
  '01000111 01010101 01000001',
  '50 47 50 20 2D 2D 20 62 65 67 69 6E',
  '47 75 73 74 61 76 6F 20 41 72 72 65 6F 6C 61',
  '43 72 79 70 74 6F 67 72 61 70 68 79 20 32 30 32 35',
  '52 53 41 2D 34 30 39 36 20 7C 20 50 47 50 2F 47 50 47',
];
let ci = 0;
function rotateCipher() {
  cipherEl.style.opacity = '0';
  setTimeout(() => {
    ci = (ci + 1) % cipherStrings.length;
    cipherEl.textContent = cipherStrings[ci];
    cipherEl.style.opacity = '0.55';
  }, 400);
}
cipherEl.style.transition = 'opacity 0.4s ease';
setInterval(rotateCipher, 2800);

// ══════════════════════════════════════════════
// HERO NAME TYPEWRITER
// ══════════════════════════════════════════════
const nameEl = document.getElementById('heroNameFirst');
const fullName = 'Gustavo Adolfo';
let nameIdx = 0;
nameEl.textContent = '';
function typeHeroName() {
  if (nameIdx < fullName.length) {
    nameEl.textContent += fullName[nameIdx++];
    setTimeout(typeHeroName, 60);
  }
}
setTimeout(typeHeroName, 500);

// ══════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // Stagger siblings
    const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, idx * 90);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ══════════════════════════════════════════════
// ACTIVE NAV HIGHLIGHT
// ══════════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--green)';
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => secObs.observe(s));

// ══════════════════════════════════════════════
// COPY PGP KEY
// ══════════════════════════════════════════════
function copyKey() {
  const content = document.getElementById('pgpKeyContent').innerText;
  navigator.clipboard.writeText(content).then(() => {
    const btn = document.getElementById('copyBtn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-check-circle"></i> ¡Copiado!';
    btn.style.color = 'var(--green)';
    btn.style.borderColor = 'var(--border-g)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2200);
  });
}

// ══════════════════════════════════════════════
// GLOBAL MOUSE TRACE (subtle glow follow)
// ══════════════════════════════════════════════
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%);
  pointer-events: none; z-index: 1; transition: transform 0.15s linear;
  transform: translate(-50%, -50%);
`;
document.body.appendChild(glow);
window.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
}, { passive: true });
