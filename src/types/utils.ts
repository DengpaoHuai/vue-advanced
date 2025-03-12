import type { UndefinedInitialQueryOptions } from '@tanstack/vue-query';

export type FormatQueryOptions<T> = Partial<
  UndefinedInitialQueryOptions<T, Error, T, readonly unknown[]>
>;
