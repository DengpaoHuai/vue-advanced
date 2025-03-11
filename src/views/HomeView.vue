<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import usePlanetStore from '@/stores/usePlanetStore';
import type { PlanetResponse } from '@/types/planet';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const page = ref('https://swapi.dev/api/planets');
//const { data: planets, loading, error } = useFetch<PlanetResponse>(page);
//const { setPlanets } = usePlanetsStore();
/*
watch(planets, () => {
  if (planets.value) setPlanets(planets.value.results);
});*/

const store = usePlanetStore();
const { planets } = storeToRefs(store);

console.log(store);
const demo = ref('demo');

const handleClick = () => {
  demo.value = 'clicked';
};
</script>

<template>
  <RouterLink :to="{ name: 'planetReactive' }">planetReactive</RouterLink>
  <RouterLink
    :to="{
      name: 'about',
      query: { foo: 'bar' },
      hash: '#baz',
    }"
    >About</RouterLink
  >
  <RouterLink :to="{ name: 'planets' }">Planets</RouterLink>
  <button @click="router.push({ name: 'about' })">About</button>
  <ul>
    <li v-for="planet in planets" :key="planet.name">
      {{ planet.name }}
    </li>
  </ul>

  <p>gdnifgh difjgoidjfg oidfgoidjfgo ijdfgo {{ demo }} sdfgkjsdhf sdiufhsdiu fhsiud fh</p>
  <button @click="handleClick">click</button>
</template>
