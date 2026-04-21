<script setup lang="ts">
const navLinks = [
  { href: '#roles', label: 'Роли' },
  { href: '#format', label: 'Формат' },
  { href: '#lessons', label: 'Видеоуроки' },
  { href: '#result', label: 'Результат' },
]

useSeoMeta({
  description:
    'Практический курс английского языка для сотрудников гостиничного бизнеса: колл-центр, reception и ресторан при отеле.',
  title: 'Hotel English',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader :links="navLinks" />

    <main id="home" class="pb-[72px]">
      <HomeHeroSection />
      <!-- <HomeVideoSection /> -->
      <HomeHighlightsSection />
      <HomeRolesSection />
      <HomeFormatSection />
      <HomeLessonsSection />
      <HomeTimelineSection />
      <HomeResultsSection />
    </main>

    <footer class="flex flex-col items-start gap-4 py-6 text-[0.94rem] text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
      <p>Учебный проект для сайта курса английского языка в сфере гостиничного бизнеса.</p>
      <a href="#home">Наверх</a>
    </footer>
  </div>
</template>
