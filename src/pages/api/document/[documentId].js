import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const documentId = req.query.documentId;
  const application = await prisma.document.findUnique({
    where: {
      id: documentId,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(document);
}
