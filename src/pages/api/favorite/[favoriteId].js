import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { favoriteId } = req.query.favoriteId;

  const favorite = await prisma.favorite.findUnique({
    where: {
      id: favoriteId,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(favorite);
}
