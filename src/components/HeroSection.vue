<script setup lang="ts">
import Button from 'primevue/button'

import { HEADSHOT_URL, heroActions, profile } from '@/data/profile'
</script>

<template>
  <section class="hero">
    <div class="lede">
      <p class="kicker">{{ profile.role }}</p>
      <h1 class="name">Alexander Vira<br />Philavong</h1>
      <p class="intro">{{ profile.intro }}</p>
      <div class="actions">
        <Button
          v-for="action in heroActions"
          :key="action.href"
          as="a"
          class="action btn"
          :class="action.primary ? 'btn-accent' : 'btn-line'"
          :label="action.label"
          :href="action.href"
          :target="action.external ? '_blank' : undefined"
          :rel="action.external ? 'noopener' : undefined"
          outlined
          :severity="action.primary ? 'primary' : 'secondary'"
        />
      </div>
    </div>

    <div class="aside">
      <img class="headshot" :src="HEADSHOT_URL" :alt="profile.name" />
      <dl class="facts">
        <div v-for="fact in profile.facts" :key="fact.label" class="fact">
          <dt>{{ fact.label }}</dt>
          <dd :class="{ accent: fact.accent }">{{ fact.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: clamp(56px, 9vw, 116px) 0 clamp(40px, 6vw, 72px);
  display: flex;
  flex-wrap: wrap;
  gap: clamp(28px, 5vw, 64px);
  align-items: flex-start;
}

.lede {
  flex: 1 1 460px;
  min-width: 0;
}

.kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 20px;
}

.name {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(34px, 5.4vw, 62px);
  line-height: 1.04;
  letter-spacing: -0.035em;
  margin: 0 0 22px;
  text-wrap: balance;
}

.intro {
  font-family: var(--t-body);
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.65;
  color: var(--t-mute);
  max-width: 56ch;
  margin: 0 0 28px;
  text-wrap: pretty;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

/* Keep the mono label treatment PrimeVue's Button doesn't assume. */
.action :deep(.p-button-label) {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
}

.aside {
  flex: 0 1 260px;
  min-width: 180px;
}

.headshot {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--t-rad);
  border: 1px solid var(--t-line);
  filter: saturate(0.82) contrast(1.04);
}

.facts {
  margin: 16px 0 0;
  font-family: var(--font-mono);
  font-size: 12px;
  display: grid;
  gap: 8px;
}

.fact {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--t-line);
}
.fact:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.fact dt {
  color: var(--t-faint);
}
.fact dd {
  margin: 0;
}
.fact dd.accent {
  color: var(--color-accent);
}
</style>
