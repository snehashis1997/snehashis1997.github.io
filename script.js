/* =====================================================
   Snehashis Chatterjee — Portfolio JS
   ===================================================== */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  bars[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  bars[1].style.opacity = isOpen ? '0' : '1';
  bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity = '1';
    bars[2].style.transform = '';
  });
});

/* ---------- Typed text effect ---------- */
const phrases = [
  'Senior Research Engineer',
  'Computer Vision Specialist',
  'Deep Learning Practitioner',
  '3D Vision Researcher',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (deleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  let delay = deleting ? 50 : 90;

  if (!deleting && charIndex === current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

// Start after hero animations
setTimeout(type, 1400);

/* ---------- Scroll-triggered animations (Intersection Observer) ---------- */
const animItems = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in the same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-aos]')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

animItems.forEach(el => observer.observe(el));

/* ---------- Active nav link highlight on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ---------- Gallery lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryImgs = [...document.querySelectorAll('.gallery-item img')];
let currentGalleryIndex = 0;

function showGalleryImage(index) {
  currentGalleryIndex = (index + galleryImgs.length) % galleryImgs.length;
  const img = galleryImgs[currentGalleryIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

galleryImgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    showGalleryImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1);
  if (e.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1);
});

/* ---------- Subtle parallax on hero bg ---------- */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }
});
