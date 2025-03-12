import crudcrud from '@/lib/crudcrud';
import { myClient } from '@/main';
import type { Movie } from '@/schemas/movie.schema';
import {
  useQuery,
  type UndefinedInitialQueryOptions,
  type UseQueryOptions,
} from '@tanstack/vue-query';

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

const useMovies = (
  customOptions?: UndefinedInitialQueryOptions<Movie[], Error, Movie[], readonly unknown[]>,
) => {
  return useQuery<Movie[]>({ ...movieQueryOptions, ...customOptions });
};

export default useMovies;
