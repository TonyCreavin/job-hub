import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const deleteFavorite = await prisma.favorite.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    res.status(200).json(deleteFavorite);
  } catch (error) {
    await prisma.$disconnect();
    res.status(403).json({ err: 'Error while deleting favorite' });
  }
}
