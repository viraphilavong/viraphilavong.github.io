<script setup lang="ts">
import ExperienceCard from '@/components/ExperienceCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { experience } from '@/data/experience'
</script>

<template>
  <section id="experience" class="section">
    <SectionHeading label="02 - Experience" />
    <div class="timeline">
      <ExperienceCard v-for="entry in experience" :key="entry.company" :entry="entry" />
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: grid;
  gap: 14px;
}
</style>
