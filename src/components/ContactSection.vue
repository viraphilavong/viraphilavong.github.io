<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { elsewhereLinks, EMAIL } from '@/data/profile'
</script>

<template>
  <section id="contact" class="section">
    <SectionHeading label="05 - Elsewhere" />
    <div class="columns">
      <div class="pitch">
        <p class="headline">
          Hiring, collaborating, or just want to compare notes - email is best.
        </p>
        <a class="email" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
      </div>

      <div class="links">
        <a
          v-for="link in elsewhereLinks"
          :key="link.href"
          class="row-link"
          :href="link.href"
          target="_blank"
          rel="noopener"
        >
          <span>{{ link.label }}</span
          ><span class="value">{{ link.value }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.columns {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(24px, 4vw, 56px);
  align-items: flex-start;
}

.pitch {
  flex: 1 1 380px;
  min-width: 0;
}

.headline {
  font-family: var(--font-mono);
  font-size: clamp(20px, 2.4vw, 30px);
  letter-spacing: -0.025em;
  line-height: 1.3;
  margin: 0 0 24px;
  max-width: 30ch;
}

.email {
  font-family: var(--font-mono);
  font-size: clamp(13px, 1.3vw, 16px);
  word-break: break-all;
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 2px;
}

.links {
  flex: 0 1 320px;
  min-width: 240px;
  display: grid;
  gap: 0;
}

.value {
  color: var(--t-faint);
}
</style>
