import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, offerId, isFavorite } = req.body;

  try {
    const result = await prisma.favorite.create({
      data: {
        user: { connect: { id: userId } },
        offer: { connect: { id: offerId } },
        isFavorite,
      },
    });

    await prisma.$disconnect();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(403).json({ err: 'Error occurred while creating favorite.' });
  }
}

// export default async function handler(req, res) {
//   const data = req.body;

//   try {
//     const favorite = await prisma.favorite.create({
//       data: {
//         ...data,
//       },
//     });
//     await prisma.$disconnect();
//     res.status(200).json(favorite);
//   } catch (err) {
//     console.log(err);
//     await prisma.$disconnect();
//     res
//       .status(403)
//       .json({ err: 'Error occurred while adding a new favorite.' });
//   }
// }
