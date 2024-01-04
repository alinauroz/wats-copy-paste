import { IGqlContext } from '@/types';

export const bin = (_: unknown, args: unknown, { user }: IGqlContext) => {
  return user;
};
