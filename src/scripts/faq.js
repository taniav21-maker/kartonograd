// src/scripts/faq.js
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  // Закрыть все ответы кроме указанного
  function closeAllAnswers(exceptElement = null) {
    faqQuestions.forEach(question => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq-icon');
      
      if (question !== exceptElement) {
        answer.classList.add('hidden');
        if (icon) {
          icon.style.transform = 'rotate(0deg)';
        }
        question.classList.remove('bg-gray-50');
      }
    });
  }
  
  // Переключить состояние вопроса
  function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.faq-icon');
    const isOpen = !answer.classList.contains('hidden');
    
    // Закрываем все остальные (аккордеон)
    closeAllAnswers(isOpen ? question : null);
    
    if (isOpen) {
      // Закрываем текущий
      answer.classList.add('hidden');
      if (icon) {
        icon.style.transform = 'rotate(0deg)';
      }
      question.classList.remove('bg-gray-50');
    } else {
      // Открываем текущий
      answer.classList.remove('hidden');
      if (icon) {
        icon.style.transform = 'rotate(45deg)';
      }
      question.classList.add('bg-gray-50');
    }
  }
  
  // Обработчики для вопросов
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      toggleFAQ(question);
    });
    
    // Инициализация иконок
    const icon = question.querySelector('.faq-icon');
    if (icon) {
      icon.style.transition = 'transform 0.3s ease';
      icon.style.transform = 'rotate(0deg)';
    }
  });
});