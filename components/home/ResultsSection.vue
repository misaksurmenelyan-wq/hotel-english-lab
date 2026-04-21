<script setup lang="ts">
const results = [
  {
    text: 'Сотрудники научатся использовать готовые фразы в типовых ситуациях обслуживания.',
    title: 'Уверенное общение',
  },
  {
    text: 'Станет проще распознавать ключевые просьбы гостя и быстро уточнять детали.',
    title: 'Понимание на слух',
  },
  {
    text: 'Работа с иностранными клиентами перестанет вызывать сильное напряжение и страх ошибки.',
    title: 'Снижение барьера',
  },
  {
    text: 'Более понятная коммуникация повышает уровень гостевого опыта и общее впечатление об отеле.',
    title: 'Качество сервиса',
  },
]
</script>

<template>
  <RevealBlock as="section" id="result" class="pt-8">
    <div class="section-head">
      <p class="eyebrow">Результат курса</p>
      <h2 class="section-title">После обучения сотрудники смогут работать увереннее и спокойнее</h2>
    </div>

    <div class="grid gap-[18px] md:grid-cols-2 xl:grid-cols-4">
      <article v-for="item in results" :key="item.title" class="glass-card p-6">
        <h3 class="mb-2.5 text-xl font-semibold">{{ item.title }}</h3>
        <p class="body-copy">{{ item.text }}</p>
      </article>
    </div>
  </RevealBlock>
</template>
