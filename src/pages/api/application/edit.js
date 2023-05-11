import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, offerId, coverLetter, applied } = req.body;
  const { applicationId } = req.query;

  try {
    const result = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        coverLetter,

        applied,
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
    res.status(500).json({ error: 'Unable to update application record.' });
  }
}
