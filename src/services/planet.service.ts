import httpClient from '@/lib/http-client';

export const getPlanets = async () => {
  const response = await httpClient.get('planets/');
  return response.data;
};
