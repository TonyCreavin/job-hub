import prisma from '../../../../lib/prisma';
export default async function handler(req, res) {
  const { id, userId, offerId, isFavorite } = req.body;

  const favoriteUpdate = await prisma.favorite.update({
    where: { id },
    data: {
      userId,
      offerId,
      isFavorite,
    },
  });
  await prisma.$disconnect();
  res.json(favoriteUpdate);
}
