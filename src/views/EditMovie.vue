<script setup lang="ts">
import InputTextVeeValidate from '@/components/inputs/InputTextVeeValidate.vue';
import { movieSchema, type Movie } from '@/schemas/movie.schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, watchEffect } from 'vue';
import { getMovieById, updateMovie } from '@/services/movies.service';

const router = useRouter();
const route = useRoute();
const mutationError = ref<string | null>(null);
const movieId = ref(route.params.id as string);

const { data: movie, isLoading } = useQuery({
  queryKey: ['movie', movieId],
  queryFn: () => getMovieById(movieId.value),
  staleTime: 60000,
});

// Configuration du formulaire avec valeurs initiales
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(movieSchema),
  initialValues: {
    title: movie.value?.title ?? '',
    description: movie.value?.description ?? '',
    rating: movie.value?.rating.toString() ?? '',
  },
});
/*
// Mise à jour du formulaire quand les données sont chargées
watchEffect(() => {
  if (movie.value) {
    resetForm({
      values: {
        title: movie.value.title,
        description: movie.value.description,
        rating: movie.value.rating.toString(),
      },
    });
  }
});
*/

const queryClient = useQueryClient();

// Configuration de la mutation pour la mise à jour
const { mutateAsync, isPending } = useMutation({
  mutationKey: ['updateMovie', movieId],
  mutationFn: async (movieData: Movie) => updateMovie(movieId.value, movieData),
  onSuccess: () => {
    queryClient.setQueryData<Movie[]>(['movies'], (oldMovies) => {
      return (
        oldMovies?.map((movie) => {
          if (movie._id === movieId.value) {
            return {
              ...movie,
              title: movieData.title,
              description: movieData.description,
              rating: movieData.rating,
            };
          }
          return movie;
        }) || []
      );
    });
    router.push({ name: 'list_movies' });
  },
  onError: (error: Error) => {
    mutationError.value = error.message;
  },
});

// Soumission du formulaire
const submit = handleSubmit(async (values) => {
  mutationError.value = null;
  await mutateAsync({
    ...values,
    _id: movieId.value, // Ajout de l'ID requis par le schema
  });
});
</script>

<template>
  <h1>Edit Movie</h1>
  <div v-if="isLoading">Chargement du film...</div>

  <template v-else>
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
          {{ isPending ? 'Mise à jour en cours...' : 'Mettre à jour' }}
        </button>
      </form>
    </div>
  </template>
</template>

<style scoped>
.error-message {
  color: red;
  margin: 1rem 0;
}
</style>
