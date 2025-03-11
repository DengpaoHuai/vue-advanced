import { z } from 'zod';

export const movieSchema = z.object({
  // _id: z.string(),
  title: z.string().min(3, 'trop court').max(25, 'trop long'),
  description: z.string().min(5).max(500),
  rating: z.string(),
});

export type Movie = z.infer<typeof movieSchema> & { _id: string };

/*
export type Movie = {
  _id: string;
  title: string;
  description: string;
  rating: string;
};*/
