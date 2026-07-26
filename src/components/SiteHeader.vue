<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'

import { useTheme } from '@/composables/useTheme'
import { navLinks } from '@/data/profile'

const { theme, toggleTheme } = useTheme()

const items = computed<MenuItem[]>(() =>
  navLinks.map((link) => ({ label: link.label, url: link.href })),
)
</script>

<template>
  <header class="header">
    <Menubar :model="items" class="bar wrap" breakpoint="700px">
      <template #start>
        <a href="#top" class="brand">
          <span class="brand-accent">~/</span><span>vira</span
          ><span class="brand-faint">.philavong</span>
        </a>
      </template>

      <!-- Rendered by hand so the links keep the mono nav treatment. -->
      <template #item="{ item, props }">
        <a class="navlink" :href="item.url" v-bind="props.action">{{ item.label }}</a>
      </template>

      <!-- Inline so the one icon on the site doesn't pull in an icon font. -->
      <template #buttonicon>
        <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path
            d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z"
          />
        </svg>
      </template>

      <template #end>
        <Button
          class="theme-toggle"
          type="button"
          title="Toggle light / dark"
          :label="theme"
          unstyled
          @click="toggleTheme"
        />
      </template>
    </Menubar>
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

.bar {
  padding-block: 12px;
  gap: 16px;
  border: 0;
  background: transparent;
}

.brand {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: -0.01em;
  color: var(--color-text);
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-right: 16px;
}
.brand-accent {
  color: var(--color-accent);
}
.brand-faint {
  color: var(--t-faint);
}

/* Push the nav to the right of the brand, toggle to the far end. */
.bar :deep(.p-menubar-root-list) {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 12px;
}

.bar :deep(.p-menubar-end) {
  margin-left: 16px;
}

/* Below the breakpoint the links collapse behind the menu button, so the row
   reads brand · toggle · button and the drawer stacks full width beneath. */
@media (max-width: 700px) {
  .bar :deep(.p-menubar-end) {
    order: 2;
    margin-left: auto;
    margin-right: 10px;
  }
  .bar :deep(.p-menubar-button) {
    order: 3;
    margin-left: 0;
  }
  .bar :deep(.p-menubar-root-list) {
    order: 4;
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
    background: var(--t-panel);
    border: 1px solid var(--t-line);
    border-radius: var(--t-rad);
    box-shadow: var(--t-shadow);
    padding: 6px;
    gap: 2px;
  }
  .brand {
    margin-right: 0;
  }
}
</style>
