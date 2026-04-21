<template>
  <RevealBlock
    as="section"
    aria-labelledby="featured-video-title"
    class="mt-7 pt-[18px]"
  >
    <div class="section-head">
      <p class="eyebrow">Пробный видеоурок</p>
      <h2 id="featured-video-title" class="section-title">Собственный плеер урока прямо на странице</h2>
    </div>

    <div class="glass-card grid items-end gap-5 p-[22px] lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
      <CustomVideoPlayer
        poster="/video/cleanest-keyboard-poster.jpg"
        src="/video/cleanest-keyboard.mp4"
      />

      <div class="grid max-w-[36ch] gap-2.5 px-1 pb-1.5">
        <h3 class="text-[1.35rem] font-semibold">Локальный HTML5-плеер без Vimeo</h3>
        <p class="body-copy">
          Видео воспроизводится как обычный файл сайта через собственный интерфейс. Никаких
          аватарок, заголовков Vimeo или его контекстного меню поверх ролика.
        </p>
      </div>
    </div>
  </RevealBlock>
</template>
