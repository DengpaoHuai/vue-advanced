<script setup lang="ts">
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getData = async () => {
  await wait(2000);
  const response = await fetch('https://swapi.dev/api/planets/');
  const data = await response.json();
  return data.results;
};

const planets = await getData();
</script>

<template>
  <ul>
    <li v-for="planet in planets" :key="planet.name">
      {{ planet.name }}
    </li>
  </ul>
</template>
