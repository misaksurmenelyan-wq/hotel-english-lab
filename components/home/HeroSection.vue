<script setup lang="ts">
const heroPills = ['Видео + конспект', 'Мини-тест к каждому уроку', '1-3 месяца обучения']

const stats = [
  { label: 'ключевые роли', value: '3' },
  { label: 'видеоуроков', value: '18' },
  { label: 'заданий в домашке', value: '5' },
  { label: 'стартовый уровень', value: 'A1-A2' },
]

const featuredLessonPoints = [
  'Numbers, dates, time',
  'Room types, meal plans and amenities',
  'Polite booking phrases',
  'Extra services overview',
  'Mini quiz: 5 tasks',
]
</script>

<template>
  <section class="grid gap-7 pb-2.5 pt-7 md:pt-[54px] lg:grid-cols-[1.2fr_0.9fr] lg:items-stretch">
    <RevealBlock class="flex flex-col">
      <p class="eyebrow">Практический курс для гостиничного бизнеса</p>
      <h1 class="hero-title max-w-[11ch]">
        Английский для сотрудников отеля, которые работают с гостями каждый день
      </h1>
      <p class="body-copy mt-5 max-w-[62ch] text-[1.03rem]">
        Курс помогает сотрудникам уверенно общаться с иностранными клиентами в реальных рабочих
        ситуациях: принимать звонки, заселять гостей, консультировать по услугам отеля и
        сопровождать обслуживание в ресторане.
      </p>

      <div class="mt-7 flex flex-wrap gap-3.5">
        <a
          class="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),#13685d)] px-6 font-bold text-white shadow-[0_18px_30px_rgba(15,90,82,0.24)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
          href="#roles"
        >
          Смотреть роли
        </a>
        <a
          class="inline-flex min-h-[50px] items-center justify-center rounded-full border border-black/10 bg-[rgba(255,250,242,0.8)] px-6 font-bold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
          href="#lessons"
        >
          Структура уроков
        </a>
      </div>

      <div class="mt-6 flex flex-wrap gap-2.5">
        <span
          v-for="pill in heroPills"
          :key="pill"
          class="inline-flex items-center rounded-full border border-black/8 bg-[rgba(255,248,238,0.82)] px-3.5 py-2 text-[0.85rem] font-bold"
        >
          {{ pill }}
        </span>
      </div>
    </RevealBlock>

    <RevealBlock as="aside" class="flex flex-col gap-[18px]">
      <div class="glass-card p-6">
        <div class="flex items-center justify-between gap-4 text-[0.84rem] text-[var(--text-muted)]">
          <span>Featured lesson</span>
          <span>12 min</span>
        </div>

        <h2 class="mt-[18px] text-2xl font-semibold">Reservation Call Basics</h2>
        <p class="body-copy mt-2.5">
          Работа с датами, типами номеров, стоимостью, питанием, ранним заездом, поздним
          выездом и дополнительными услугами отеля.
        </p>

        <ul class="body-copy mt-[18px] list-disc space-y-1.5 pl-[18px]">
          <li v-for="item in featuredLessonPoints" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article v-for="stat in stats" :key="stat.label" class="glass-card p-[22px]">
          <strong class="block text-[2rem] font-extrabold">{{ stat.value }}</strong>
          <span class="text-[var(--text-muted)]">{{ stat.label }}</span>
        </article>
      </div>
    </RevealBlock>
  </section>
</template>
