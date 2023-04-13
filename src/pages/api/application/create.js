import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, offerId, coverLetter, favorite, applied } = req.body;

  try {
    const result = await prisma.application.create({
      data: {
        user: { connect: { id: userId } },
        offer: { connect: { id: offerId } },

        coverLetter,
        favorite,
        applied,
      },
    });
    await prisma.$disconnect();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res
      .status(403)
      .json({ err: 'Error occurred while adding a new user to offer.' });
  }
}
