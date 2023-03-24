import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, offerId, cv, coverLetter, favorite, applied } = req.body;
  const { applicationId } = req.query;

  try {
    const result = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        cv,
        coverLetter,
        favorite,
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

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update application record.' });
  }
}
