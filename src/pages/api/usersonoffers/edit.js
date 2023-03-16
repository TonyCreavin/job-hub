import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, offerId } = req.body;
  const { usersonoffersId } = req.query;

  try {
    const result = await prisma.usersonoffers.update({
      where: {
        id: usersonoffersId,
      },
      data: {
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
    res.status(500).json({ error: 'Unable to update usersonoffers record.' });
  }
}
