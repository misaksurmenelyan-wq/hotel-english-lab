<script setup lang="ts">
const timelineSteps = [
  {
    text: 'Приветствие, простые вопросы, числа, даты, время',
    title: 'Starter',
  },
  {
    text: 'Речевые шаблоны и рабочие ситуации по ролям',
    title: 'Service English',
  },
  {
    text: 'Ролевые игры, звонки и решение проблем гостей',
    title: 'Speaking Practice',
  },
]
</script>

<template>
  <RevealBlock as="section" class="grid gap-[18px] pt-8 lg:grid-cols-[1fr_1.05fr]">
    <article class="soft-panel p-7">
      <p class="eyebrow">Интенсивность</p>
      <h2 class="section-title mb-3.5 mt-1.5">2-3 занятия в неделю в течение 1-3 месяцев</h2>
      <p class="body-copy">
        Курс можно проводить онлайн или офлайн, в мини-группах или индивидуально. Такой формат
        позволяет не перегружать сотрудников, но при этом стабильно наращивать лексику и практику.
      </p>
    </article>

    <div class="soft-panel grid gap-4 p-7">
      <div
        v-for="step in timelineSteps"
        :key="step.title"
        class="relative rounded-[22px] border border-black/8 bg-[rgba(255,252,247,0.88)] px-[18px] py-[18px] pl-[22px]"
      >
        <span
          class="absolute bottom-4 left-0 top-4 w-1 rounded-full bg-[linear-gradient(180deg,var(--accent),var(--secondary))]"
        />
        <strong class="mb-1.5 block text-base">{{ step.title }}</strong>
        <span class="body-copy block">{{ step.text }}</span>
      </div>
    </div>
  </RevealBlock>
</template>
