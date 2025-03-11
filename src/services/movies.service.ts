import crudcrud from '@/lib/crudcrud';

export const getMovies = async () => {
  const response = await crudcrud.get('movies');
  return response.data;
};

export const createMovie = async (movie) => {
  const response = await crudcrud.post('movies', movie);
  return response.data;
};

export const updateMovie = async (movie) => {
  const response = await crudcrud.put(`movies/${movie._id}`, movie);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await crudcrud.delete(`movies/${id}`);
  return response.data;
};
