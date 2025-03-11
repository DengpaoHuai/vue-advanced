import crudcrud from '@/lib/crudcrud';
import { movieSchema, type Movie } from '@/schemas/movie.schema';
import { z } from 'zod';

export const getMovies = async () => {
  const response = await crudcrud.get('movies');
  /* const parsedData = z.array(movieSchema).safeParse(response.data);
    if (!parsedData.success) {
        throw new Error('Invalid data');
    }*/
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

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const deleteMovie = async (id: string) => {
  await waitFor(2000);

  const response = await crudcrud.delete(`movies/${id}`);
  return response.data;
};
