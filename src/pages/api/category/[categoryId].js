import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const { categoryId } = req.query;
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(category);
}
