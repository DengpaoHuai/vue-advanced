<script setup lang="ts">
import useMovieStore from '@/stores/useMovieStore';
import usePlanetsStore from '@/stores/usePlanets';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const { createData } = useMovieStore();
const router = useRouter();

const movieForm = reactive({
  title: '',
  description: '',
  rating: '',
});

const onSubmit = () => {
  createData(movieForm);
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
    </form>
  </div>
</template>
