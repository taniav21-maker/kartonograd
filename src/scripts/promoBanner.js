// src/scripts/promoBanner.js
document.addEventListener('DOMContentLoaded', () => {
  const promoBanner = document.getElementById('promo-banner');
  const closePromoBtn = document.getElementById('close-promo');
  
  if (!promoBanner || !closePromoBtn) return;
  
  // Проверяем, не закрыл ли уже пользователь баннер
  const isPromoClosed = localStorage.getItem('promoBannerClosed') === 'true';
  
  if (isPromoClosed) {
    promoBanner.classList.add('hidden');
    return;
  }
  
  // Обработчик клика на крестик
  closePromoBtn.addEventListener('click', () => {
    promoBanner.classList.add('hidden');
    localStorage.setItem('promoBannerClosed', 'true');
  });
});