/* js/main.js - Archivo principal de interactividad básica */

document.addEventListener('DOMContentLoaded', () => {
  /* ----------------------------------------------------
     1. MODO OSCURO CON CSS VARIABLES 
     ---------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');

  // Revisamos en la memoria del navegador si ya estaba oscuro
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    // Cambiamos el icono a Sol
    if (icon) icon.classList.replace('bx-moon', 'bx-sun');
  }

  // Evento al hacer clic en el botón del menú
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Si actualmente es oscuro, lo quitamos
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (icon) icon.classList.replace('bx-sun', 'bx-moon');
      } else {
        // Si no es oscuro, lo activamos
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (icon) icon.classList.replace('bx-moon', 'bx-sun');
      }
    });
  }

  /* ----------------------------------------------------
     2. EFECTO SCROLL REVEAL 
     ---------------------------------------------------- */
  // IntersectionObserver es la forma nativa para detectar cuando algo entra en la pantalla al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Le agregamos la clase "active" para que ejecute su animacion de CSS
        entry.target.classList.add('active');
        // Dejamos de observar para que no se anime 10 veces si subimos y bajamos (Mejora rendimiento)
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // El 10% del elemento debe ser visible para que inicie

  // Le decimos al observador que vigile todos los elementos con la clase .reveal
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => observer.observe(el));

  /* ----------------------------------------------------
     3. FUNCIONALIDAD DEL CARRUSEL
     ---------------------------------------------------- */
  const carousel = document.getElementById('testimonialsCarousel');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (carousel && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      // Desplazar a la izquierda por el ancho de un elemento más el gap aproximado
      const scrollAmount = carousel.firstElementChild ? carousel.firstElementChild.clientWidth + 20 : 300;
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      // Desplazar a la derecha por el ancho de un elemento más el gap aproximado
      const scrollAmount = carousel.firstElementChild ? carousel.firstElementChild.clientWidth + 20 : 300;
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
});
