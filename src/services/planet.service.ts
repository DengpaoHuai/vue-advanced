import httpClient from '@/lib/http-client';

export const getPlanets = async (page = 1) => {
  const response = await httpClient.get(`planets/?page=${page}`);
  return response.data;
};
