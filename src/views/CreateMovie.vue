<script setup lang="ts">
import InputTextVeeValidate from '@/components/inputs/InputTextVeeValidate.vue';
import { movieSchema, type Movie } from '@/schemas/movie.schema';
import useMovieStore from '@/stores/useMovieStore';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

const { createData } = useMovieStore();
const router = useRouter();

const { handleSubmit } = useForm<Omit<Movie, '_id'>>({
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
  <div>
    <form @submit.prevent="submit">
      <InputTextVeeValidate name="title" />
      <InputTextVeeValidate name="description" />
      <InputTextVeeValidate name="rating" />
      <button type="submit">Create</button>
    </form>
  </div>
</template>
