import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const data = req.body;

  try {
    // const offer = await prisma.offer.findUnique({
    //   where: { id: data.offerId },
    // });
    // const user = await prisma.user.findUnique({
    //   where: { id: data.userId },
    // });

    const favorite = await prisma.favorite.create({
      data: {
        ...data,
        //   isFavorite: data.isFavorite,
        //   userId: data.userId,
        //   offerId: data.offerId,
        //   user: { connect: { id: user.id } },
        //   offer: { connect: { id: offer.id } },
        // },
      },
    });
    await prisma.$disconnect();
    res.status(200).json(favorite);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res
      .status(403)
      .json({ err: 'Error occurred while adding a new favorite.' });
  }
}
