import prisma from '@/prisma/prisma';
import { Prisma } from '@prisma/client';

const getInternalId = async (text: string) => {
  try {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');
    hash.update(text);
    const buffer = hash.digest();
    // get 64 bit hash
    const h = buffer.slice(0, 8);

    const chars = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '-',
      '+',
    ];

    let finalHash = '';
    let bHash = buffer.readBigUInt64LE().toString(2);
    while (bHash.length < 66) {
      bHash = '0' + bHash;
    }
    for (let i = 0; i < bHash.length; i += 6) {
      let p = parseInt(bHash.substr(i, 6), 2);
      finalHash += chars[p];
    }

    return finalHash;
  } catch (err) {
    return '';
  }
};

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
