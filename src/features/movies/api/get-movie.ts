import crudcrud from '@/lib/crudcrud';
import { myClient } from '@/main';
import type { Movie } from '@/schemas/movie.schema';

export const getMovieById = async (id: string): Promise<Movie> => {
  const response = await crudcrud.get(`movies/${id}`);
  return response.data;
};

export const prefetchMovie = async (id: string) => {
  await myClient.prefetchQuery<Movie[]>({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id),
  });
};
