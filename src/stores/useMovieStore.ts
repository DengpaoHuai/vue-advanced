import type { Movie } from '@/schemas/movie.schema';
import { createMovie, deleteMovie, getMovies } from '@/services/movies.service';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

const useMovieStore = defineStore('movie', () => {
  const movies = ref<Movie[]>([]);

  const getData = async () => {
    const response = await getMovies();
    movies.value = response;
  };

  const createData = async (movie: Omit<Movie, '_id'>) => {
    const response = await createMovie(movie);
    movies.value.push(response);
  };

  const deleteData = async (id: string) => {
    await deleteMovie(id);
    movies.value = movies.value.filter((movie) => movie._id !== id);
  };

  onMounted(() => {
    getData();
  });

  return {
    movies,
    getData,
    createData,
    deleteData,
  };
});

export default useMovieStore;
