import prisma from '../../../../lib/prisma';
import path from 'path';
import fs from 'fs/promises';

export default async function handler(req, res) {
  const documentId = req.query.documentId;
  const document = await prisma.document.findUnique({
    where: {
      id: documentId,
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
        id: documentId,
      },
    });

    res.status(204).send('Document deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting file');
  }
}
