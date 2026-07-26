<script setup lang="ts">
import Timeline from 'primevue/timeline'

import ExperienceCard from '@/components/ExperienceCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { experience } from '@/data/experience'
</script>

<template>
  <section id="experience" class="section">
    <SectionHeading label="02 - Experience" />
    <Timeline :value="experience" class="timeline">
      <template #opposite="{ item }">
        <span class="period">{{ item.period }}</span>
      </template>
      <template #content="{ item }">
        <ExperienceCard :entry="item" />
      </template>
    </Timeline>
  </section>
</template>

<style scoped>
/* The period column is fixed so every card starts on the same edge. */
.timeline :deep(.p-timeline-event-opposite) {
  flex: 0 0 150px;
  padding: 0 clamp(16px, 3vw, 40px) 0 0;
  text-align: left;
}

.timeline :deep(.p-timeline-event-content) {
  padding: 0 0 14px clamp(16px, 3vw, 40px);
}

.timeline :deep(.p-timeline-event:last-child .p-timeline-event-content) {
  padding-bottom: 0;
}

/* Markers sit on the card's top rule rather than centered on the event. */
.timeline :deep(.p-timeline-event-marker) {
  margin-top: 5px;
}

.period {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--t-faint);
  line-height: 1.5;
}

/* Below the breakpoint the rail would crowd the card, so the period folds
   into the card itself (see ExperienceCard) and this column collapses. */
@media (max-width: 700px) {
  .timeline :deep(.p-timeline-event-opposite) {
    display: none;
  }
  .timeline :deep(.p-timeline-event-content) {
    padding-left: clamp(12px, 3vw, 20px);
  }
}
</style>
