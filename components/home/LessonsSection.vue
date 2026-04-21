<script setup lang="ts">
const lessonHighlights = [
  {
    text: 'reservation, available room, rate, breakfast included, early check-in, late check-out',
    title: 'Лексика',
  },
  {
    text: 'questions with what / when / how many, there is / there are, polite requests',
    title: 'Грамматика',
  },
]

const lessonSupportCards = [
  {
    items: [
      'Ключевые слова по теме',
      '5-8 полезных фраз',
      'Мини-диалог для чтения',
      'Краткое объяснение грамматики',
    ],
    title: 'Конспект под видео',
  },
  {
    items: [
      'Выбрать правильную реплику',
      'Сопоставить слово и перевод',
      'Вставить дату и время',
      'Заполнить пропуски в диалоге',
      'Решить одну рабочую ситуацию',
    ],
    title: 'Домашнее задание',
  },
]
</script>

<template>
  <RevealBlock as="section" id="lessons" class="pt-8">
    <div class="section-head">
      <p class="eyebrow">Структура видеоконтента</p>
      <h2 class="section-title">Как выглядит один готовый урок на сайте</h2>
    </div>

    <div class="grid gap-[18px] xl:grid-cols-[1.2fr_0.8fr_0.8fr]">
      <article
        class="rounded-[28px] border border-white/45 bg-[linear-gradient(135deg,rgba(15,90,82,0.95),rgba(21,117,102,0.88))] p-[26px] text-white shadow-[0_22px_60px_rgba(35,38,48,0.12)]"
      >
        <p class="inline-flex rounded-full border border-white/20 bg-white/14 px-3.5 py-2 text-[0.85rem] font-bold">
          Урок 04
        </p>
        <h3 class="mb-2.5 mt-4 text-xl font-semibold">Бронирование номера по телефону</h3>
        <p class="leading-[1.7] text-white/82">
          Гость звонит в отель, чтобы выбрать номер на нужные даты. Сотрудник должен уточнить
          информацию, предложить вариант и объяснить условия проживания, питания и дополнительных услуг.
        </p>

        <div class="mt-5 grid gap-3.5 md:grid-cols-2">
          <div v-for="item in lessonHighlights" :key="item.title">
            <h4 class="text-[0.98rem] font-semibold">{{ item.title }}</h4>
            <p class="mt-2 leading-[1.7] text-white/82">{{ item.text }}</p>
          </div>
        </div>
      </article>

      <article v-for="card in lessonSupportCards" :key="card.title" class="glass-card p-[26px]">
        <h3 class="mb-2.5 text-xl font-semibold">{{ card.title }}</h3>
        <ul class="body-copy list-disc space-y-1.5 pl-[18px]">
          <li v-for="item in card.items" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>
    </div>
  </RevealBlock>
</template>
