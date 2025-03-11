import { createMovie, getMovies } from '@/services/movies.service';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

const useMovieStore = defineStore('movie', () => {
  const movies = ref([]);

  const getData = async () => {
    const response = await getMovies();
    movies.value = response;
  };

  const createData = async (movie) => {
    const response = await createMovie(movie);
    movies.value.push(response);
  };

  onMounted(() => {
    getData();
  });

  return {
    movies,
    getData,
    createData,
  };
});

export default useMovieStore;
