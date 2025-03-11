<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import { getPlanets } from '@/services/planet.service';
import type { Planet, PlanetResponse } from '@/types/planet';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const page = ref(1);

const { data, isLoading, isError, error } = useQuery<PlanetResponse>({
  queryKey: ['planets', page],
  queryFn: () => getPlanets(page.value),
  // staleTime: 5000,
  refetchOnWindowFocus: true,
});
</script>

<template>
  <h1>Planets</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-if="isError">{{ error }}</p>
  <ul>
    <li v-for="planet in data?.results" :key="planet.name">
      {{ planet.name }}
    </li>
  </ul>
  <button @click="page--" :disabled="isLoading || !data?.previous">prev</button>
  <button @click="page++" :disabled="isLoading || !data?.next">next</button>
</template>
