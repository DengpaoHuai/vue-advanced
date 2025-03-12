<script setup lang="ts">
import ListMovies from '@/features/movies/components/ListMovies.vue';
</script>

<template>
  <ErrorBoundary>
    <Suspense>
      <ListMovies />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
    <template #error="{ error }">
      <p v-if="error">An error occurred: {{ error.message }}</p>
    </template>
  </ErrorBoundary>
</template>
