<script setup lang="ts">
const formatCards = [
  {
    description:
      'Короткий урок по рабочей ситуации: звонок, check-in, заказ в ресторане или жалоба гостя.',
    step: '1',
    title: 'Видео',
  },
  {
    description:
      'Под видео размещаются заметки: лексика, полезные фразы, грамматика и краткое объяснение темы.',
    step: '2',
    title: 'Конспект',
  },
  {
    description:
      'Студент отрабатывает диалог, повторяет фразы и учится узнавать шаблоны из реальной работы.',
    step: '3',
    title: 'Практика',
  },
  {
    description: 'После каждого урока идет мини-тест из 5 заданий для закрепления материала.',
    step: '4',
    title: 'Домашка',
  },
]
</script>

<template>
  <RevealBlock as="section" id="format" class="pt-8">
    <div class="section-head">
      <p class="eyebrow">Формат обучения</p>
      <h2 class="section-title">Один понятный шаблон для каждого видеоурока</h2>
    </div>

    <div class="grid gap-[18px] md:grid-cols-2 xl:grid-cols-4">
      <article v-for="item in formatCards" :key="item.step" class="glass-card p-6">
        <span
          class="inline-grid h-[42px] w-[42px] place-items-center rounded-full bg-[var(--accent-soft)] font-extrabold text-[var(--accent)]"
        >
          {{ item.step }}
        </span>
        <h3 class="mb-2.5 mt-4 text-xl font-semibold">{{ item.title }}</h3>
        <p class="body-copy">{{ item.description }}</p>
      </article>
    </div>
  </RevealBlock>
</template>
