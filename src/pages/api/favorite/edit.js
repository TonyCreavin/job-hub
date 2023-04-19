import prisma from '../../../../lib/prisma';
// export default async function handler(req, res) {
//   const { id, userId, offerId, isFavorite } = req.body;

//   const favoriteUpdate = await prisma.favorite.update({
//     where: { id },
//     data: {
//       userId,
//       offerId,
//       isFavorite,
//     },
//   });
//   await prisma.$disconnect();
//   res.json(favoriteUpdate);
// }

export default async function handler(req, res) {
  const { id, userId, offerId, isFavorite } = req.body;
  //const { favoriteId } = req.query;

  try {
    const result = await prisma.favorite.update({
      where: { id },

      data: {
        isFavorite,
        user: {
          connect: {
            id: userId,
          },
        },
        offer: {
          connect: {
            id: offerId,
          },
        },
      },
    });
    await prisma.$disconnect();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    res.status(500).json({ error: 'Unable to update favorite record.' });
  }
}
