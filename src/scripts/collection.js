// src/scripts/collection.js
document.addEventListener('DOMContentLoaded', () => {
  // Данные фигурок
  const figures = [
    { id: 1, name: "Лиса", category: "Звери", set: "Старт", isNew: false },
    { id: 2, name: "Медведь", category: "Звери", set: "Для всей семьи", isNew: false },
    { id: 3, name: "Внедорожник", category: "Техника", set: "Старт", isNew: false },
    { id: 4, name: "Самолёт", category: "Техника", set: "Для всей семьи", isNew: false },
    { id: 5, name: "Ракета", category: "Космос", set: "На праздник!", isNew: false },
    { id: 6, name: "Спутник", category: "Космос", set: "На праздник!", isNew: true }
  ];

  // Элементы
  const filterButtons = document.querySelectorAll('.collection-filter');
  const figureCards = document.querySelectorAll('.figure-card');
  const allFiguresButton = document.querySelector('[data-filter="all"]');
  
  // Функция фильтрации
  function filterFigures(category) {
    // Обновляем активную кнопку
    filterButtons.forEach(btn => {
      btn.classList.remove('bg-accent-orange', 'text-white');
      btn.classList.add('bg-gray-100', 'text-craft-dark', 'hover:bg-gray-200');
    });
    
    const activeButton = document.querySelector(`[data-filter="${category}"]`);
    if (activeButton) {
      activeButton.classList.remove('bg-gray-100', 'text-craft-dark', 'hover:bg-gray-200');
      activeButton.classList.add('bg-accent-orange', 'text-white');
    }
    
    // Показываем/скрываем карточки
    figureCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const isNew = card.dataset.new === 'true';
      
      let shouldShow = false;
      
      switch(category) {
        case 'all':
          shouldShow = true;
          break;
        case 'novelty':
          shouldShow = isNew;
          break;
        default:
          shouldShow = cardCategory === category;
      }
      
      if (shouldShow) {
        card.classList.remove('hidden');
        // Добавляем плавное появление
        setTimeout(() => {
          card.classList.remove('opacity-0');
          card.classList.add('opacity-100');
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  }
  
  // Обработчики для кнопок фильтра
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterFigures(filter);
    });
  });
  
  // Инициализация - показываем все фигурки
  if (allFiguresButton) {
    allFiguresButton.classList.remove('bg-gray-100', 'text-craft-dark', 'hover:bg-gray-200');
    allFiguresButton.classList.add('bg-accent-orange', 'text-white');
  }
  
  // Плавная анимация для всех карточек при загрузке
  figureCards.forEach(card => {
    card.classList.add('transition-opacity', 'duration-300');
  });
});