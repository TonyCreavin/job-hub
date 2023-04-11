import prisma from '../../../../../lib/prisma';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  console.log('deeellleete', req);
  const { id } = req.body;
  const document = await prisma.document.findUnique({
    where: {
      id,
    },
  });

  if (!document) {
    res.status(404).send('Document not found');
    return;
  }

  const filePath = path.join(document.path);

  try {
    await fs.unlink(filePath);
    await prisma.document.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    res.status(200).send('Document deleted');
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    res.status(500).send('Error deleting file');
  }
}
