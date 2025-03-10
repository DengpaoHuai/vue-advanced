<script setup lang="ts">
import PlanetList from '@/components/PlanetList.vue';
</script>

<template>
  <Suspense>
    <PlanetList />
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>
