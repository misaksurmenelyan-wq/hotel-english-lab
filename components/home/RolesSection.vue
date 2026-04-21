<script setup lang="ts">
type RoleId = 'call-center' | 'reception' | 'restaurant'

type RoleGroup = {
  items: string[]
  title: string
}

type RoleCard = {
  description: string
  groups: RoleGroup[]
  id: RoleId
  kicker: string
  label: string
  title: string
}

const roles: RoleCard[] = [
  {
    description:
      'Роль охватывает телефонные разговоры, подбор номера, уточнение условий проживания, информацию о питании и дополнительных услугах отеля, а также спокойную коммуникацию в случае изменений или жалоб.',
    groups: [
      {
        items: [
          'Приветствие и скрипт звонка',
          'Числа, даты и время',
          'Типы номеров и удобства',
          'Питание и тарифы',
          'Ранний заезд, поздний выезд и хранение багажа',
          'Дополнительные услуги, изменения и жалобы',
        ],
        title: 'Темы',
      },
      {
        items: [
          '<code>How may I help you?</code>',
          '<code>For what dates would you like to book?</code>',
          '<code>We have a double room available.</code>',
          '<code>Breakfast is included in the rate.</code>',
          '<code>We also provide additional hotel services.</code>',
          '<code>We can store your luggage at reception.</code>',
        ],
        title: 'Фразы',
      },
      {
        items: [
          '<code>there is / there are</code>',
          'вопросы с <code>what</code>, <code>when</code>, <code>how many</code>',
          'вежливые формы с <code>can</code>, <code>could</code>, <code>would</code>',
          'present simple для типовых процессов',
        ],
        title: 'Грамматика',
      },
    ],
    id: 'call-center',
    kicker: 'Call center / reservations',
    label: 'Колл-центр',
    title: 'Бронирование, даты, номера, питание и частые вопросы гостей',
  },
  {
    description:
      'Администратор сопровождает гостя на месте: встречает, проверяет бронь, оформляет документы при заселении, объясняет правила, подсказывает услуги отеля, решает возникающие проблемы и работает с жалобами гостей.',
    groups: [
      {
        items: [
          'Welcome at reception',
          'Check-in and documents',
          'Facilities and hotel directions',
          'Breakfast, payment, and invoice',
          'Check-out and farewell',
          'Guest requests, problems, and complaints',
        ],
        title: 'Темы',
      },
      {
        items: [
          '<code>May I see your passport, please?</code>',
          '<code>Your room is on the third floor.</code>',
          '<code>Breakfast is served from 7 to 10 a.m.</code>',
          '<code>Please fill in this form.</code>',
          '<code>Let me check that for you.</code>',
        ],
        title: 'Фразы',
      },
      {
        items: [
          'повелительные формы для инструкций',
          'предлоги места: <code>on</code>, <code>next to</code>, <code>between</code>',
          'короткие ответы и уточняющие вопросы',
          'past simple в сценариях бронирования',
        ],
        title: 'Грамматика',
      },
    ],
    id: 'reception',
    kicker: 'Reception / front desk',
    label: 'Администратор',
    title: 'Заселение, документы, навигация по отелю и решение проблем гостей',
  },
  {
    description:
      'Третья роль добавляет к курсу сервис внутри отеля: встречу гостя в ресторане, работу с меню, рекомендациями, аллергиями и оплатой.',
    groups: [
      {
        items: [
          'Greeting and seating guests',
          'Menu vocabulary',
          'Taking the order',
          'Dish and drink recommendations',
          'Allergies and preferences',
          'Bill and payment',
        ],
        title: 'Темы',
      },
      {
        items: [
          '<code>Would you like still or sparkling water?</code>',
          '<code>Are you allergic to anything?</code>',
          '<code>Today&apos;s special is grilled salmon.</code>',
          '<code>What would you like to order?</code>',
          '<code>Here is your bill.</code>',
        ],
        title: 'Фразы',
      },
      {
        items: [
          '<code>some / any</code>',
          'исчисляемые и неисчисляемые существительные',
          'вежливые предложения и рекомендации',
          'базовые вопросы в обслуживании',
        ],
        title: 'Грамматика',
      },
    ],
    id: 'restaurant',
    kicker: 'Restaurant service',
    label: 'Официант',
    title: 'Обслуживание гостя в ресторане при отеле',
  },
]

const activeRole = ref<RoleId>('call-center')

const currentRole = computed(() => roles.find((role) => role.id === activeRole.value) ?? roles[0])
</script>

<template>
  <RevealBlock as="section" id="roles" class="pt-8">
    <div class="section-head">
      <p class="eyebrow">Три роли курса</p>
      <h2 class="section-title">Сайт строится вокруг типовых рабочих сценариев</h2>
    </div>

    <div
      class="inline-flex flex-wrap gap-2.5 rounded-full border border-black/8 bg-[rgba(255,247,238,0.68)] p-2"
      role="tablist"
      aria-label="Роли курса"
    >
      <button
        v-for="role in roles"
        :key="role.id"
        class="rounded-full px-[18px] py-3 font-bold transition-all duration-200"
        :class="
          activeRole === role.id
            ? 'translate-y-[-1px] bg-[var(--text)] text-white'
            : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
        "
        :aria-controls="`panel-${role.id}`"
        :aria-selected="String(activeRole === role.id)"
        role="tab"
        type="button"
        @click="activeRole = role.id"
      >
        {{ role.label }}
      </button>
    </div>

    <article
      :id="`panel-${currentRole.id}`"
      class="soft-panel mt-[22px] p-7 md:p-8"
      role="tabpanel"
    >
      <div class="max-w-[70ch]">
        <p
          class="mb-2 inline-flex items-center rounded-full border border-black/8 bg-[rgba(255,248,238,0.82)] px-3.5 py-2 text-[0.85rem] font-bold"
        >
          {{ currentRole.kicker }}
        </p>
        <h3 class="mb-2.5 text-[1.25rem] font-semibold">{{ currentRole.title }}</h3>
        <p class="body-copy">{{ currentRole.description }}</p>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="group in currentRole.groups" :key="group.title" class="glass-card p-[22px]">
          <h4 class="text-base font-semibold">{{ group.title }}</h4>
          <ul class="body-copy mt-3.5 list-disc space-y-1.5 pl-[18px]">
            <li v-for="item in group.items" :key="item">
              <span v-html="item" />
            </li>
          </ul>
        </div>
      </div>
    </article>
  </RevealBlock>
</template>
