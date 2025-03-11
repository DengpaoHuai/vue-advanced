<script setup lang="ts">
import type { Movie } from '@/schemas/movie.schema';
import { deleteMovie, getMovieById, getMovies } from '@/services/movies.service';
import useMovieStore from '@/stores/useMovieStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();

const { data } = useQuery<Movie[]>({
  queryKey: ['movies'],
  queryFn: getMovies,
  staleTime: 60000,
});

const { mutate } = useMutation({
  mutationFn: (id: string) => deleteMovie(id),
  onMutate: async (id: string) => {
    const oldCache = queryClient.getQueryData<Movie[]>(['movies']);

    queryClient.setQueryData<Movie[]>(['movies'], (oldMovies) => {
      return oldMovies?.filter((movie) => movie._id !== id) || [];
    });

    return oldCache ?? [];
  },
  onError: (err, newTodo, oldCache) => {
    queryClient.setQueryData<Movie[]>(['movies'], oldCache);
  },
  onSuccess: async (data) => {
    queryClient.invalidateQueries({ queryKey: ['movies'] });
    console.log(data);
  },
});

const prefetchData = (id: string) => {
  console.log(id);
  queryClient.prefetchQuery<Movie[]>({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id),
    staleTime: 60000,
  });
};
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
          @mouseover="prefetchData(movie._id)"
        >
          >Edit</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
