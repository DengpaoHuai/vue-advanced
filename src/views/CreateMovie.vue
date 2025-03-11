<script setup lang="ts">
import InputTextVeeValidate from '@/components/inputs/InputTextVeeValidate.vue';
import { movieSchema, type Movie } from '@/schemas/movie.schema';
import useMovieStore from '@/stores/useMovieStore';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

const { createData } = useMovieStore();
const router = useRouter();

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(movieSchema),
});

const submit = handleSubmit(async (values) => {
  createData(values);
  router.push({
    name: 'list_movies',
  });
});
</script>

<template>
  <h1>Create Movie</h1>
  <div v-if="errors.title">{{ errors.title }}</div>
  <div v-if="errors.description">{{ errors.description }}</div>
  <div v-if="errors.rating">{{ errors.rating }}</div>
  <div>
    <form @submit.prevent="submit">
      <InputTextVeeValidate name="title" />
      <InputTextVeeValidate name="description" />
      <InputTextVeeValidate name="rating" />
      <button type="submit">Create</button>
    </form>
  </div>
</template>
