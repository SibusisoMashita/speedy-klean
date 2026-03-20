/* ============================================================
   Speedy Klean Service — app.js
   Handles: nav toggle, WhatsApp CTAs, smooth scroll
   ============================================================ */

/* ── PLACEHOLDER: Update this number before going live ─────── */
/* Format: country code + number, no + or spaces               */
/* South Africa: 27 + 10-digit number (drop the leading 0)     */
const WA_NUMBER = '27848262990'; // Nozipho — 084 826 2990

/* ── WhatsApp message templates ────────────────────────────── */
const WA_MESSAGES = {
  general:   'Hi, I would like a quote for your cleaning services.',
  couch:     'Hi, I would like a quote for couch cleaning.',
  carpet:    'Hi, I would like a quote for carpet cleaning.',
  apartment: 'Hi, I would like a quote for apartment deep cleaning.',
  moveout:   'Hi, I would like a quote for move-in / move-out cleaning.',
  office:    'Hi, I would like a quote for home and office cleaning.',
  special:   'Hi, I would like a quote for a special cleaning service.',
  pricing:   'Hi, I would like more information about your pricing.',
};

/* ── Build a wa.me URL ──────────────────────────────────────── */
function waUrl(messageKey) {
  const text = WA_MESSAGES[messageKey] || WA_MESSAGES.general;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ── Attach WhatsApp href to all [data-wa] elements ─────────── */
function initWhatsAppLinks() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    const key = el.dataset.wa || 'general';
    const url = waUrl(key);
    if (el.tagName === 'A') {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      // button or div — add click handler
      el.addEventListener('click', () => {
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  });
}

/* ── Mobile nav toggle ──────────────────────────────────────── */
function initNav() {
  const toggle  = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    // Prevent body scroll when menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ── Sticky nav highlight on scroll ────────────────────────── */
function initScrollHighlight() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mark active nav link based on current page ────────────── */
function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0] === path) {
      link.classList.add('active');
    }
  });
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initNav();
  initScrollHighlight();
  initActiveNavLink();
});
