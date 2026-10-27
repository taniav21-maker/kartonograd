// src/scripts/stickyButton.js
document.addEventListener('DOMContentLoaded', () => {
  const stickyButton = document.getElementById('sticky-button');
  const heroSection = document.getElementById('hero');
  const catalogSection = document.getElementById('catalog');
  
  if (!stickyButton || !heroSection || !catalogSection) return;
  
  let heroVisible = true;
  let catalogVisible = false;
  
  // Observer для Hero блока
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      heroVisible = entry.isIntersecting;
      updateButtonVisibility();
    });
  }, { threshold: 0.1 });
  
  // Observer для Catalog блока
  const catalogObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      catalogVisible = entry.isIntersecting;
      updateButtonVisibility();
    });
  }, { threshold: 0.1 });
  
  heroObserver.observe(heroSection);
  catalogObserver.observe(catalogSection);
  
  function updateButtonVisibility() {
    // Показываем кнопку, если Hero не виден И Catalog не виден
    // (то есть пользователь прокрутил ниже первого экрана, но еще не дошел до каталога)
    if (!heroVisible && !catalogVisible) {
      stickyButton.classList.remove('hidden');
    } else {
      stickyButton.classList.add('hidden');
    }
  }
  
  // Инициализация при загрузке
  updateButtonVisibility();
});