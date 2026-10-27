// src/scripts/cart.js
document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('kartonograd_cart')) || [];
  
  // Данные товаров
  const products = [
    { id: 1, name: "Старт", details: 255, description: "Идеально для первого знакомства", price: 1000, recommended: false },
    { id: 2, name: "Для всей семьи", details: 370, description: "Хватит на несколько вечеров сборки", price: 1490, recommended: true },
    { id: 3, name: "На праздник!", details: 490, description: "Для компании детей или подарка", price: 1690, recommended: false }
  ];
  
  // Обновление иконки корзины в шапке
  function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const mobileBadge = document.getElementById('cart-badge-mobile');
    
    if (badge) {
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    
    if (mobileBadge) {
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      mobileBadge.textContent = totalCount;
      mobileBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
  }

  // Добавление в корзину
  window.addToCart = function(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, name: productName, price: price, quantity: 1 });
    }
    localStorage.setItem('kartonograd_cart', JSON.stringify(cart));
    updateCartBadge();
    alert(`"${productName}" добавлен в корзину!`);
    return false; // Чтобы не перезагружалась страница
  };

  // Инициализация при загрузке
  updateCartBadge();

  // Навешиваем обработчики на все кнопки "В корзину"
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(button.dataset.id);
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      addToCart(id, name, price);
    });
  });
  
  // --- ЛОГИКА МОДАЛЬНЫХ ОКОН ---
  
  // Элементы модалок
  const cartModal = document.getElementById('cart-modal');
  const productModal = document.getElementById('product-modal');
  const cartIconTrigger = document.getElementById('cart-icon-trigger');
  const cartIconTriggerMobile = document.getElementById('cart-icon-trigger-mobile');
  const closeButtons = document.querySelectorAll('.close-modal');

  // Функция отрисовки содержимого корзины
  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    
    if (!cartItemsContainer || !cartTotalContainer) return;
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Корзина пуста</p>';
      cartTotalContainer.textContent = 'Итого: 0 ₽';
      return;
    }
    
    // Рассчитываем сумму
    let subtotal = 0;
    const itemsHtml = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      return `
        <div class="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
          <div class="flex-1">
            <p class="font-semibold text-craft-dark">${product.name}</p>
            <p class="text-gray-500 text-sm">${product.price.toLocaleString('ru-RU')} ₽ × ${item.quantity}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button class="decrease-quantity px-3 py-1 text-gray-500 hover:text-craft-dark" data-id="${item.id}">−</button>
              <span class="px-3">${item.quantity}</span>
              <button class="increase-quantity px-3 py-1 text-gray-500 hover:text-craft-dark" data-id="${item.id}">+</button>
            </div>
            <div class="text-right min-w-24">
              <p class="font-bold">${itemTotal.toLocaleString('ru-RU')} ₽</p>
            </div>
            <button class="remove-item text-gray-400 hover:text-red-500 text-xl" data-id="${item.id}">×</button>
          </div>
        </div>
      `;
    }).join('');
    
    cartItemsContainer.innerHTML = itemsHtml;
    
    // Применяем промокод если есть
    let discount = 0;
    let appliedPromoCode = '';
    try {
      const promoData = JSON.parse(localStorage.getItem('kartonograd_promo')) || {};
      appliedPromoCode = promoData.code || '';
      discount = promoData.discount || 0;
    } catch {
      // Если ошибка, сбрасываем промокод
      localStorage.removeItem('kartonograd_promo');
    }
    
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal - discountAmount;
    
    let totalHtml = '';
    if (discount > 0) {
      totalHtml = `
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Сумма:</span>
            <span>${subtotal.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div class="flex justify-between text-green-600">
            <span>Скидка (${discount}%):</span>
            <span>−${discountAmount.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div class="flex justify-between text-xl font-bold pt-2 border-t">
            <span>Итого:</span>
            <span>${total.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      `;
    } else {
      totalHtml = `<div class="flex justify-between text-xl font-bold">
        <span>Итого:</span>
        <span>${total.toLocaleString('ru-RU')} ₽</span>
      </div>`;
    }
    
    cartTotalContainer.innerHTML = totalHtml;
    
    // Обработчики для кнопок в корзине
    cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        updateCartQuantity(id, -1);
      });
    });
    
    cartItemsContainer.querySelectorAll('.increase-quantity').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        updateCartQuantity(id, 1);
      });
    });
    
    cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        removeFromCart(id);
      });
    });
    
    // Обновляем сообщение о промокоде
    const promoMessage = document.getElementById('promo-message');
    if (promoMessage) {
      if (discount > 0) {
        promoMessage.textContent = `Применён промокод ${appliedPromoCode}. Скидка ${discount}%`;
        promoMessage.className = 'text-green-600 text-sm';
        promoMessage.classList.remove('hidden');
      } else if (appliedPromoCode) {
        promoMessage.textContent = 'Промокод недействителен';
        promoMessage.className = 'text-red-500 text-sm';
        promoMessage.classList.remove('hidden');
      } else {
        promoMessage.classList.add('hidden');
      }
    }
  }

  // Функция обновления количества товара
  function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
      }
      localStorage.setItem('kartonograd_cart', JSON.stringify(cart));
      updateCartBadge();
      renderCartItems(); // Перерисовываем корзину
    }
  }

  // Функция удаления из корзины
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('kartonograd_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartItems(); // Перерисовываем корзину
  }

  // Функция открытия корзины
  function openCart() {
    renderCartItems();
    if (cartModal) cartModal.classList.remove('hidden');
  }

  // Функция открытия товара
  window.openProductModal = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !productModal) return;
    
    const content = document.getElementById('product-modal-content');
    content.innerHTML = `
      <div class="mb-6">
        <div class="bg-gray-200 h-64 rounded-xl mb-4 flex items-center justify-center">
          <div class="text-center">
            <div class="text-6xl mb-2">📦</div>
            <p class="text-gray-500 text-sm">фото набора</p>
          </div>
        </div>
        <h3 class="text-2xl font-fredoka font-bold text-craft-dark mb-2">${product.name}</h3>
        <p class="text-gray-600 mb-2">${product.details} деталей</p>
        <p class="text-gray-600 mb-4">${product.description}</p>
        <div class="text-3xl font-bold text-accent-orange mb-6">${product.price.toLocaleString('ru-RU')} ₽</div>
        <button class="add-to-cart-btn-modal w-full bg-accent-orange text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition duration-300" 
          data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
          В корзину
        </button>
      </div>
    `;
    productModal.classList.remove('hidden');
    
    // Перенавешиваем обработчики на новую кнопку "В корзину" внутри модалки
    content.querySelector('.add-to-cart-btn-modal').addEventListener('click', (e) => {
      const btn = e.target;
      const id = parseInt(btn.dataset.id);
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      addToCart(id, name, price);
      productModal.classList.add('hidden');
    });
  };

  // Функция закрытия всех модалок
  function closeAllModals() {
    if (cartModal) cartModal.classList.add('hidden');
    if (productModal) productModal.classList.add('hidden');
  }

  // Обработчики событий
  if (cartIconTrigger) {
    cartIconTrigger.addEventListener('click', openCart);
  }
  
  if (cartIconTriggerMobile) {
    cartIconTriggerMobile.addEventListener('click', openCart);
  }

  document.querySelectorAll('.open-product-modal').forEach(img => {
    img.addEventListener('click', () => {
      const id = parseInt(img.dataset.id);
      openProductModal(id);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // Закрытие по клику на затемненный фон
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) closeAllModals();
    if (e.target === productModal) closeAllModals();
  });
  
  // Обработчик промокода
  const applyPromoBtn = document.getElementById('apply-promo');
  const promoInput = document.getElementById('promo-input');
  
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim();
      let discount = 0;
      let valid = false;
      
      if (code === 'KARTON10') {
        discount = 10;
        valid = true;
      }
      
      localStorage.setItem('kartonograd_promo', JSON.stringify({ code, discount }));
      renderCartItems(); // Перерисовываем корзину с учетом скидки
      
      const promoMessage = document.getElementById('promo-message');
      if (promoMessage) {
        if (valid) {
          promoMessage.textContent = `Применён промокод ${code}. Скидка ${discount}%`;
          promoMessage.className = 'text-green-600 text-sm';
          promoMessage.classList.remove('hidden');
        } else {
          promoMessage.textContent = 'Промокод недействителен';
          promoMessage.className = 'text-red-500 text-sm';
          promoMessage.classList.remove('hidden');
        }
      }
    });
  }
  
  // Обработчик оформления заказа
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
      }
      
      const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
      
      alert(`Спасибо за заказ на сумму ${total.toLocaleString('ru-RU')} ₽!\n\nМы свяжемся с вами в ближайшее время для подтверждения заказа.`);
      
      // Очищаем корзину
      cart = [];
      localStorage.removeItem('kartonograd_cart');
      localStorage.removeItem('kartonograd_promo');
      updateCartBadge();
      renderCartItems();
      closeAllModals();
    });
  }
});