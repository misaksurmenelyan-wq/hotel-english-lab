# Hotel English

Лендинг курса английского языка для гостиничного бизнеса, перенесенный на `Nuxt 3 + Vue 3 + Tailwind CSS` с `pnpm`.

## Структура

- `pages/index.vue` - основная страница лендинга
- `components/CustomVideoPlayer.vue` - кастомный HTML5-плеер на Vue
- `components/RevealBlock.vue` - анимация появления секций при скролле
- `components/SiteHeader.vue` - шапка и навигация
- `assets/css/main.css` - глобальные стили, тема и стили плеера
- `public/video/` - локальные видеофайлы и постер

## Запуск локально

```bash
pnpm install
pnpm dev
```

По умолчанию Nuxt поднимет проект на `http://localhost:3000`.

Для проекта зафиксирован `Node.js 22.16.0` через `.tool-versions` (`asdf`).

## Сборка

```bash
pnpm build
pnpm preview
```

Если нужен статический экспорт:

```bash
pnpm generate
```

## Что можно развивать дальше

- разнести секции по отдельным Vue-компонентам
- добавить отдельные страницы уроков через файловый роутинг Nuxt
- вынести контент курса в JSON или CMS
- подключить формы заявок и аналитику
