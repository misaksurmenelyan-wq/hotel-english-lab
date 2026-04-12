# Hotel English

Учебный одностраничный сайт для курса английского языка в сфере гостиничного бизнеса.

## Что внутри

- `index.html` - структура сайта
- `styles.css` - оформление и адаптивность
- `script.js` - переключение ролей и анимации появления блоков

## Как открыть сайт локально

1. Открой папку `english` в `VS Code`.
2. Запусти файл `index.html` через расширение `Live Server` или просто открой его в браузере.

## Как выложить сайт на GitHub Pages

### Вариант 1: без Git, через сайт GitHub

1. Создай новый репозиторий на GitHub, например `hotel-english-lab`.
2. Нажми `uploading an existing file`.
3. Перетащи в репозиторий файлы:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
4. Нажми `Commit changes`.
5. Открой `Settings` -> `Pages`.
6. В блоке `Build and deployment` выбери:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
7. Сохрани настройки.
8. Через пару минут сайт появится по адресу:

```text
https://USERNAME.github.io/hotel-english-lab/
```

### Вариант 2: через Git из терминала VS Code

1. Создай новый репозиторий на GitHub, например `hotel-english-lab`.
2. В терминале `VS Code` открой папку проекта и выполни:

```powershell
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/USERNAME/hotel-english-lab.git
git push -u origin main
```

3. На GitHub открой `Settings` -> `Pages`.
4. В блоке `Build and deployment` выбери:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
5. Сохрани настройки.
6. Через пару минут сайт появится по адресу:

```text
https://USERNAME.github.io/hotel-english-lab/
```

## Что можно добавить позже

- страницу с отдельными уроками
- встроенные видео
- блок с тестами и формой обратной связи
- английскую версию сайта
