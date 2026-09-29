/* ============================================================
   SHRITEJ PATIL — PORTFOLIO JAVASCRIPT
   Features: Navbar scroll, typing effect, scroll reveal, mobile menu
   ============================================================ */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => activeLinkObserver.observe(section));

// ===== MOBILE MENU =====
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
});

// ===== TYPING EFFECT =====
const roles = [
  'Backend Developer',
  'MERN Stack Developer',
  'Problem Solver',
  'Aspiring Software Engineer',
  'Node.js Developer',
];

const typedEl = document.getElementById('typed-role');
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typeTimeout;

function type() {
  const currentRole = roles[roleIdx];

  if (isDeleting) {
    typedEl.textContent = currentRole.slice(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = currentRole.slice(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === currentRole.length) {
    delay = 2200; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }

  typeTimeout = setTimeout(type, delay);
}

// Start typing after hero loads
setTimeout(type, 800);

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger children within same parent
        const siblings = entry.target.parentElement.querySelectorAll(
          '.reveal-up, .reveal-left, .reveal-right'
        );
        let delay = 0;
        siblings.forEach((sib, i) => {
          if (sib === entry.target) {
            delay = i * 80;
          }
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== FOOTER YEAR =====
const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ===== SKILL PILL HOVER RIPPLE =====
document.querySelectorAll('.skill-pill').forEach((pill) => {
  pill.addEventListener('mouseenter', () => {
    pill.style.setProperty('--scale', '1.05');
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.removeProperty('--scale');
  });
});

// ===== CURSOR TRAIL EFFECT (subtle) =====
let mouseX = 0, mouseY = 0;
const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.6);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(trail);

let trailX = 0, trailY = 0;
let rafId;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  trail.style.opacity = '1';
}, { passive: true });

document.addEventListener('mouseleave', () => {
  trail.style.opacity = '0';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.18;
  trailY += (mouseY - trailY) * 0.18;
  trail.style.left = `${trailX}px`;
  trail.style.top = `${trailY}px`;
  rafId = requestAnimationFrame(animateTrail);
}
animateTrail();

// ===== HERO PARALLAX ON MOUSE MOVE =====
const hero = document.querySelector('.hero');
const orbs = document.querySelectorAll('.hero-orb');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    orbs.forEach((orb) => {
      orb.style.transform = '';
    });
  });
}

// ===== CARD TILT EFFECT =====
function addTilt(selector, maxTilt = 6) {
  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const x = e.clientX - rect.left - cx;
      const y = e.clientY - rect.top - cy;
      const rotX = (-y / cy) * maxTilt;
      const rotY = (x / cx) * maxTilt;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

addTilt('.project-card', 5);
addTilt('.cert-card', 4);
addTilt('.exp-card', 3);
