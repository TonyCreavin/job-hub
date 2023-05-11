import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const documents = await prisma.document.findMany({});
  await prisma.$disconnect();
  res.status(200).json(documents);
}
