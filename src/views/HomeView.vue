<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import type { PlanetResponse } from '@/types/planet';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const page = ref('https://swapi.dev/api/planets');
const { data: planets, loading, error } = useFetch<PlanetResponse>(page);

const demo = ref('demo');

const handleClick = () => {
  demo.value = 'clicked';
};
</script>

<template>
  <RouterLink
    :to="{
      name: 'about',
      query: { foo: 'bar' },
      hash: '#baz',
    }"
    >About</RouterLink
  >
  <button @click="router.push({ name: 'about' })">About</button>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <ul>
    <li v-for="planet in planets?.results" :key="planet.name">
      {{ planet.name }}
    </li>
  </ul>
  <button @click="page = planets?.previous!" :disabled="!planets?.previous">prev</button>
  <button @click="page = planets?.next!" :disabled="!planets?.next">next</button>

  <p>gdnifgh difjgoidjfg oidfgoidjfgo ijdfgo {{ demo }} sdfgkjsdhf sdiufhsdiu fhsiud fh</p>
  <button @click="handleClick">click</button>
</template>
