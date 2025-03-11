<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useRoute } from 'vue-router';

const route = useRoute();

console.log(route.meta.layout);
</script>

<template>
  <component :is="route.meta.layout ?? 'DefaultLayout'">
    <RouterView />
  </component>
  <VueQueryDevtools />
</template>
