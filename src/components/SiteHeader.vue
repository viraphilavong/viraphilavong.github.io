<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { navLinks } from '@/data/profile'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <header class="header">
    <div class="wrap header-bar">
      <a href="#top" class="brand">
        <span class="brand-accent">~/</span><span>vira</span
        ><span class="brand-faint">.philavong</span>
      </a>
      <nav class="nav">
        <a v-for="link in navLinks" :key="link.href" class="navlink" :href="link.href">
          {{ link.label }}
        </a>
      </nav>
      <button class="theme-toggle" type="button" title="Toggle light / dark" @click="toggleTheme">
        {{ theme }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, var(--color-bg) 86%, transparent);
  border-bottom: 1px solid var(--t-line);
}

.header-bar {
  padding-block: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.brand {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: -0.01em;
  color: var(--color-text);
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-right: auto;
}
.brand-accent {
  color: var(--color-accent);
}
.brand-faint {
  color: var(--t-faint);
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  font-family: var(--font-mono);
  font-size: 12px;
}
</style>
