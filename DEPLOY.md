# Инструкция по деплою на GitHub Pages

## Шаг 1: Создать репозиторий на GitHub

1. Зайдите на [GitHub](https://github.com)
2. Создайте новый репозиторий с именем `kartonograd`
3. **Важно:** Если вы хотите использовать домен `username.github.io/kartonograd`, репозиторий должен называться `kartonograd`
4. Если вы хотите использовать `username.github.io` (корневой домен), репозиторий должен называться `username.github.io`

## Шаг 2: Настроить репозиторий

### Вариант A: Ручная загрузка
1. Скопируйте все файлы из папки `/Users/tatiana/myai/kartonograd` в репозиторий
2. **Исключите:** папку `node_modules/` и файлы `.env`
3. Загрузите файлы через веб-интерфейс GitHub или используйте Git:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/kartonograd.git
git push -u origin main
```

### Вариант B: Клонирование и обновление
```bash
git clone https://github.com/username/kartonograd.git
cd kartonograd
# Скопируйте файлы проекта сюда
git add .
git commit -m "Add project files"
git push
```

## Шаг 3: Настроить GitHub Pages

1. Зайдите в репозиторий на GitHub
2. Перейдите в Settings → Pages
3. В разделе "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root) или /dist/ если используете ручной деплой
4. Нажмите Save

## Шаг 4: Проверить деплой

1. GitHub Actions автоматически запустит workflow при первом push
2. Дождитесь завершения сборки (зеленая галочка)
3. Сайт будет доступен по адресу:
   - `https://username.github.io/kartonograd/` (если репозиторий `kartonograd`)
   - `https://username.github.io/` (если репозиторий `username.github.io`)

## Шаг 5: Проверить сайт

1. Откройте сайт в браузере
2. Проверьте:
   - Все ли блоки отображаются
   - Работает ли корзина (добавление товаров)
   - Работает ли фильтрация фигурок
   - Адаптивность на мобильных устройствах
   - Модальные окна открываются/закрываются

## 🔧 Дополнительные настройки

### Изменить base URL
Если вы изменили имя репозитория, обновите `astro.config.mjs`:

```javascript
const base = '/имя-репозитория/'; // Замените на ваше имя
```

### Проблемы с деплоем

1. **GitHub Actions падает:**
   - Проверьте логи в Actions → Deploy to GitHub Pages
   - Убедитесь, что в package.json правильные зависимости
   - Убедитесь, что нет ошибок в коде

2. **Сайт не отображается правильно:**
   - Проверьте консоль браузера на ошибки
   - Убедитесь, что все пути начинаются с `/kartonograd/`
   - Проверьте, что CSS и JS файлы загружаются

3. **Изображения не отображаются:**
   - Проверьте, что все placeholder имеют aria-label
   - Убедитесь, что нет ошибок 404 для ресурсов

## 🌐 Альтернативные хостинги

Если не хотите использовать GitHub Pages:

### Vercel
1. Зайдите на [Vercel](https://vercel.com)
2. Импортируйте репозиторий GitHub
3. Настройка автоматическая

### Netlify
1. Зайдите на [Netlify](https://netlify.com)
2. Drag & drop папку `dist/`
3. Или подключите GitHub репозиторий

### Cloudflare Pages
1. Зайдите на [Cloudflare Pages](https://pages.cloudflare.com)
2. Подключите GitHub репозиторий
3. Выберите Astro как фреймворк

## 📞 Поддержка

Если возникли проблемы с деплоем:
1. Проверьте логи GitHub Actions
2. Откройте Issue в репозитории
3. Свяжитесь со мной для помощи

---

✅ **Сайт готов к публикации!** Удачи с деплоем! 🚀