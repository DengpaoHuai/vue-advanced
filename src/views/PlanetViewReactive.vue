<script setup lang="ts">
import usePlanetsStore from '@/stores/usePlanets';
import { toRefs } from 'vue';

const { planets } = usePlanetsStore();
</script>

<template>
  <ul>
    <li v-for="planet in planets" :key="planet.name">
      {{ planet.name }}
    </li>
  </ul>
</template>
