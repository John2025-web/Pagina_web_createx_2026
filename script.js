/* ================================================
   CREATEX 2026 — Memoria del evento | SENA
   script.js
================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MENÚ MÓVIL ---------- */
  const navToggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });

    // Cierra el menú al hacer clic en un enlace (móvil)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
      });
    });
  }

  /* ---------- LIGHTBOX DE GALERÍA ---------- */
  const galleryItems = document.querySelectorAll('.story__media');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');

  let currentIndex = 0;
  const images = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.parentElement.querySelector('.story__title');
    images.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      caption: title ? title.textContent.trim() : img.getAttribute('alt')
    });

    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    updateLightboxImage();
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const current = images[currentIndex];
    lightboxImg.setAttribute('src', current.src);
    lightboxImg.setAttribute('alt', current.alt);
    lightboxCaption.textContent = current.caption;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  /* ---------- HEADER: sombra al hacer scroll ---------- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 6px 20px rgba(0,0,0,.35)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

});
