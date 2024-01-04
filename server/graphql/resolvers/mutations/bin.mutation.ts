import prisma from '@/prisma/prisma';
import { getInternalId } from '../../../utils/id';

export const createBin = async (_: unknown, { texts }: { texts: string[] }) => {
  const idsList = await Promise.all(texts.map((text) => getInternalId(text)));
  const alreadyExists = await prisma.bin.findMany({
    select: { i_id: true },
    where: { i_id: { in: idsList } },
  });
  const alreadyExistsIds = await alreadyExists.map((bin) => bin.i_id);

  const ids = idsList.filter((id) => alreadyExistsIds.indexOf(id) === -1);

  const data = ids.map((i_id, index) => {
    return {
      i_id,
      text: texts[index],
    };
  });

  if (data.length > 0) {
    await prisma.bin.createMany({ data });
  }

  const bins = await prisma.bin.findMany({ where: { i_id: { in: idsList } } });

  return bins;
};
