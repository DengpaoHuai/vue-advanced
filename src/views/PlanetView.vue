<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import type { Planet } from '@/types/planet';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const planets = route.meta.planets as Planet[];
</script>

<template>
  <ul>
    <li v-for="planet in planets" :key="planet.name">
      {{ planet.name }}
    </li>
  </ul>
</template>
