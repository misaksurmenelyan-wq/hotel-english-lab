<script setup lang="ts">
const highlights = [
  {
    number: '01',
    text: 'Темы строятся на реальных сценариях работы в отеле, а не на абстрактной теории.',
    title: 'Практика',
  },
  {
    number: '02',
    text: 'Курс не распыляется и охватывает три роли, которые чаще всего работают с гостями.',
    title: 'Фокус',
  },
  {
    number: '03',
    text: 'После обучения сотрудники лучше понимают гостей, увереннее отвечают и быстрее решают вопросы.',
    title: 'Результат',
  },
]
</script>

<template>
  <RevealBlock
    as="section"
    class="mt-[34px] grid gap-[18px] lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]"
  >
    <article class="glass-card p-7">
      <p class="mb-2.5 text-[0.76rem] font-extrabold uppercase tracking-[0.08em] text-[var(--secondary)]">
        Зачем курс
      </p>
      <h2 class="info-title mb-3.5">Сервис начинается с понятной коммуникации</h2>
      <p class="body-copy">
        Гость оценивает не только номер и интерьер, но и то, насколько легко с ним общаются.
        Профессиональный английский снижает стресс для сотрудника и делает сервис более уверенным.
      </p>
    </article>

    <article v-for="item in highlights" :key="item.number" class="glass-card p-6">
      <span class="mb-[22px] inline-flex text-[1.1rem] font-extrabold text-[var(--secondary)]">
        {{ item.number }}
      </span>
      <h3 class="mb-2.5 text-xl font-semibold">{{ item.title }}</h3>
      <p class="body-copy">{{ item.text }}</p>
    </article>
  </RevealBlock>
</template>
