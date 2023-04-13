import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const categories = await prisma.category.findMany({});
  await prisma.$disconnect();
  res.status(200).json(categories);
}
