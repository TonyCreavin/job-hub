import prisma from '../../../../lib/prisma';
import path from 'path';
import { promises as fs } from 'fs';

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
    const fileContents = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(fileContents);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading file');
  }
}
