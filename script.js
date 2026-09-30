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

/* ---------- Gallery slider + lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const gallerySlider = document.getElementById('gallerySlider');
const galleryHome = gallerySlider.parentElement;
const galleryMainImg = document.getElementById('galleryMainImg');
const galleryTitle = document.getElementById('galleryTitle');
const galleryCounter = document.getElementById('galleryCounter');
const galleryThumbs = [...document.querySelectorAll('.gallery-thumb')];
let currentGalleryIndex = 0;
let galleryInView = false;

function centreActiveThumb() {
  const thumb = galleryThumbs[currentGalleryIndex];
  const strip = thumb.parentElement;
  strip.scrollLeft = thumb.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2;
}

function showGalleryImage(index) {
  currentGalleryIndex = (index + galleryThumbs.length) % galleryThumbs.length;
  const thumb = galleryThumbs[currentGalleryIndex];
  const { src, alt } = thumb.dataset;

  galleryMainImg.classList.add('fading');
  setTimeout(() => {
    galleryMainImg.src = src;
    galleryMainImg.alt = alt;
    galleryMainImg.classList.remove('fading');
  }, 150);

  galleryTitle.textContent = alt;
  galleryCounter.textContent = `${currentGalleryIndex + 1} / ${galleryThumbs.length}`;
  galleryThumbs.forEach(t => t.classList.toggle('active', t === thumb));
  centreActiveThumb();
}

galleryThumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => showGalleryImage(index));
});

document.getElementById('galleryPrev').addEventListener('click', () => showGalleryImage(currentGalleryIndex - 1));
document.getElementById('galleryNext').addEventListener('click', () => showGalleryImage(currentGalleryIndex + 1));

// The lightbox shows the same slider (big image + thumbnail trail), moved into the overlay
function openLightbox() {
  lightbox.appendChild(gallerySlider);
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  centreActiveThumb();
}

function closeLightbox() {
  galleryHome.appendChild(gallerySlider);
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  centreActiveThumb();
}

galleryMainImg.addEventListener('click', () => {
  if (!lightbox.classList.contains('active')) openLightbox();
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

new IntersectionObserver(
  ([entry]) => { galleryInView = entry.isIntersecting; },
  { threshold: 0.3 }
).observe(gallerySlider);

document.addEventListener('keydown', (e) => {
  const inLightbox = lightbox.classList.contains('active');
  if (!inLightbox && !galleryInView) return;
  if (e.key === 'Escape' && inLightbox) closeLightbox();
  if (e.key === 'ArrowRight') { e.preventDefault(); showGalleryImage(currentGalleryIndex + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); showGalleryImage(currentGalleryIndex - 1); }
});

/* ---------- Subtle parallax on hero bg ---------- */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }
});
