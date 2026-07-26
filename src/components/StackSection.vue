<script setup lang="ts">
import Card from 'primevue/card'

import SectionHeading from '@/components/SectionHeading.vue'
import { stack } from '@/data/stack'
</script>

<template>
  <section id="stack" class="section">
    <SectionHeading label="03 - Skills &amp; tools" />
    <div class="grid">
      <Card v-for="group in stack" :key="group.title" class="group">
        <template #title>
          <p class="label">{{ group.title }}</p>
        </template>
        <template #content>
          <ul class="items">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: clamp(20px, 3vw, 40px);
}

.group {
  border-top: 1px solid var(--t-line);
  /* Card resolves its own radius token, which isn't Nocturne's 8px. */
  border-radius: var(--t-rad);
}

.label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 14px;
}

.items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--t-mute);
}
</style>
