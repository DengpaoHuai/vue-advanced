import crudcrud from '@/lib/crudcrud';
import type { Movie } from '@/schemas/movie.schema';

export const getMovies = async () => {
  const response = await crudcrud.get('movies');
  return response.data;
};

export const createMovie = async (movie: Omit<Movie, '_id'>) => {
  const response = await crudcrud.post('movies', movie);
  return response.data;
};

export const updateMovie = async (movie: Partial<Movie>) => {
  const response = await crudcrud.put(`movies/${movie._id}`, movie);
  return response.data;
};

export const deleteMovie = async (id: string) => {
  const response = await crudcrud.delete(`movies/${id}`);
  return response.data;
};
