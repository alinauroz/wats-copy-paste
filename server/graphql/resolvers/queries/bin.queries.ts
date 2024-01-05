import prisma from '@/prisma/prisma';
import { IGqlContext } from '@/types';

export const bin = (
  _: unknown,
  { id: i_id }: { id: string },
  { user }: IGqlContext
) => {
  return prisma.bin.findFirst({ where: { i_id } });
};
