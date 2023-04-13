import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const { id } = req.body;
  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    res.status(200).json(deleteCategory);
  } catch (err) {
    await prisma.$disconnect();
    res.status(500).json({ message: err.message });
  }
}
