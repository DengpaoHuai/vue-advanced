<script setup lang="ts">
import InputTextVeeValidate from '@/components/inputs/InputTextVeeValidate.vue';
import { movieSchema, type Movie } from '@/schemas/movie.schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { createMovie } from '@/services/movies.service';

const router = useRouter();
const mutationError = ref<string | null>(null);

// Configuration du formulaire
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(movieSchema),
});

// Configuration de la mutation
const { mutate, isPending } = useMutation({
  mutationKey: ['createMovie'],
  mutationFn: async (movieData: Omit<Movie, '_id'>) => createMovie(movieData),
  onSuccess: () => {
    router.push({ name: 'list_movies' });
  },
  onError: (error: Error) => {
    mutationError.value = error.message;
  },
});

// Soumission du formulaire
const submit = handleSubmit(async (values) => {
  mutationError.value = null;
  mutate(values);
});
</script>

<template>
  <h1>Create Movie</h1>
  <div v-if="errors.title">{{ errors.title }}</div>
  <div v-if="errors.description">{{ errors.description }}</div>
  <div v-if="errors.rating">{{ errors.rating }}</div>
  <div v-if="mutationError" class="error-message">{{ mutationError }}</div>

  <div>
    <form @submit.prevent="submit">
      <InputTextVeeValidate name="title" />
      <InputTextVeeValidate name="description" />
      <InputTextVeeValidate name="rating" />

      <button type="submit" :disabled="isPending">
        {{ isPending ? 'Création en cours...' : 'Créer' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  margin: 1rem 0;
}
</style>
