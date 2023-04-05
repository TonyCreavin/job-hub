import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, offerId, cv, coverLetter, favorite, applied } = req.body;

  try {
    const result = await prisma.application.create({
      data: {
        user: { connect: { id: userId } },
        offer: { connect: { id: offerId } },
        cv,
        coverLetter,
        favorite,
        applied,
      },
    });
    res.status(200).json(result);
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: 'Error occurred while adding a new user to offer.' });
    await prisma.$disconnect();
  }
}
