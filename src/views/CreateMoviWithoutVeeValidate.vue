<script setup lang="ts">
import { movieSchema } from '@/schemas/movie.schema';
import useMovieStore from '@/stores/useMovieStore';
import usePlanetsStore from '@/stores/usePlanets';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';

const { createData } = useMovieStore();
const router = useRouter();

const errors = ref<string[]>([]);

const movieForm = reactive({
  title: '',
  description: '',
  rating: '',
});

const onSubmit = () => {
  // const result = movieSchema.omit({ _id: true }).safeParse(movieForm);
  const result = movieSchema.safeParse(movieForm);
  if (!result.success) {
    errors.value = result.error.errors.map((error) => error.message);
    return;
  }
  createData(result.data);
  router.push({
    name: 'list_movies',
  });
};

usePlanetsStore();
</script>

<template>
  <h1>Create Movie</h1>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="movieForm.title" placeholder="Title" />
      <input type="text" v-model="movieForm.description" placeholder="Description" />
      <input type="text" v-model="movieForm.rating" placeholder="Rating" />
      <button type="submit">Create</button>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </form>
  </div>
</template>
