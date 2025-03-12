import crudcrud from '@/lib/crudcrud';
import { myClient } from '@/main';
import type { Movie } from '@/schemas/movie.schema';
import type { FormatQueryOptions } from '@/types/utils';
import {
  useQuery,
  type UndefinedInitialQueryOptions,
  type UseQueryOptions,
} from '@tanstack/vue-query';
import { computed } from 'vue';

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getMovies = async () => {
  await waitFor(2000);
  const response = await crudcrud.get('movies');
  return response.data;
};

export const movieQueryOptions = {
  queryKey: ['movies'],
  queryFn: getMovies,
  staleTime: 60000,
};

const useMovies = (customOptions?: FormatQueryOptions<Movie[]>) => {
  const response = useQuery<Movie[]>({ ...movieQueryOptions, ...customOptions });

  const moviesFiltered = computed(() =>
    response.data.value?.filter((movie) => movie.title.includes('a')),
  );

  return {
    ...response,
    filter: moviesFiltered,
  };
};

export default useMovies;
