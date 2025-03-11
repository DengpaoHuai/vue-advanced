<script setup lang="ts">
import useMovieStore from '@/stores/useMovieStore';
import usePlanetsStore from '@/stores/usePlanets';
import { reactive, ref } from 'vue';

const { movies, deleteData } = useMovieStore();

usePlanetsStore();
</script>

<template>
  <h1>List Movie</h1>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        {{ movie.title }}
        <button @click="movie._id && deleteData(movie._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
