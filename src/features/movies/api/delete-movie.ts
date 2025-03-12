import crudcrud from '@/lib/crudcrud';
import type { Movie } from '@/schemas/movie.schema';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

export const deleteMovie = async (id: string) => {
  const response = await crudcrud.delete(`movies/${id}`);
  return response.data;
};

const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
};

export default useDeleteMovie;
