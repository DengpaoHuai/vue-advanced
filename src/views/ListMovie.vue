<script setup lang="ts">
import useMovieStore from '@/stores/useMovieStore';
import usePlanetsStore from '@/stores/usePlanets';
import { reactive, ref } from 'vue';

const { movies } = useMovieStore();

usePlanetsStore();
</script>

<template>
  <h1>List Movie</h1>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>
