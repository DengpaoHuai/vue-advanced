<script setup lang="ts">
import useFetch from './composables/useFetch';
import type { Planet } from './types/planet';

const { data: planets, loading, error } = useFetch<Planet[]>('https://swapi.dev/api/planets/');
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <ul>
    <li v-for="planet in planets" :key="planet.name">
      {{ planet.name }}
    </li>
  </ul>
  <button>next</button>
  <button>prev</button>
</template>
