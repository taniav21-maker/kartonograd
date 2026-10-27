// src/middleware.js
export const onRequest = ({ request }, next) => {
  return next().then((response) => {
    // Клонируем response чтобы изменить заголовки
    const newResponse = new Response(response.body, response);
    
    // Получаем текущий content-type
    const contentType = newResponse.headers.get('content-type');
    
    // Если это HTML и нет charset, добавляем utf-8
    if (contentType && contentType.includes('text/html') && !contentType.includes('charset')) {
      newResponse.headers.set('content-type', `${contentType}; charset=utf-8`);
    }
    
    return newResponse;
  });
};