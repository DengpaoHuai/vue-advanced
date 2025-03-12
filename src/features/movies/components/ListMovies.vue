<script setup lang="ts">
import useDeleteMovie from '@/features/movies/api/delete-movie';
import { getMovieById } from '@/features/movies/api/get-movie';
import useMovies from '@/features/movies/api/get-movies';

const { data, suspense } = useMovies();

const { mutate } = useDeleteMovie();

await suspense();
</script>

<template>
  <h1>List Movie</h1>
  <div>
    <ul>
      <li v-for="movie in data" :key="movie._id">
        {{ movie.title }}
        <button @click="mutate(movie._id)">Delete</button>
        <RouterLink
          :to="{ name: 'edit_movie', params: { id: movie._id } }"
          @mouseover="getMovieById(movie._id)"
        >
          >Edit</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
