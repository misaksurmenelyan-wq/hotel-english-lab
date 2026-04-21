<script setup lang="ts">
defineProps<{
  links: Array<{
    href: string
    label: string
  }>
}>()
</script>

<template>
  <header
    class="sticky top-0 z-10 flex flex-col gap-6 py-5 backdrop-blur-[14px] md:flex-row md:items-center md:justify-between"
  >
    <a class="inline-flex items-center gap-3.5 self-start" href="#home">
      <span
        class="grid h-[46px] w-[46px] place-items-center rounded-[14px] bg-[linear-gradient(135deg,var(--accent),#147365)] font-display text-[1.7rem] font-bold text-white shadow-[0_12px_24px_rgba(15,90,82,0.25)]"
      >
        H
      </span>

      <span class="flex flex-col gap-0.5">
        <strong class="text-[0.98rem]">Hotel English</strong>
        <small class="text-[0.78rem] text-[var(--text-muted)]">English for hotel teams</small>
      </span>
    </a>

    <nav
      class="flex flex-wrap items-center justify-center gap-5 self-stretch rounded-full border border-white/35 bg-[rgba(255,251,245,0.72)] px-[18px] py-[14px] shadow-[0_10px_30px_rgba(40,45,56,0.08)] md:self-auto"
    >
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="text-[0.94rem] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)] focus-visible:text-[var(--text)]"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
