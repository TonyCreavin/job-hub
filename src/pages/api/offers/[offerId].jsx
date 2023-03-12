import prisma from '../../../../lib/prisma';

export default function handler(req, res) {
  const { offerId } = req.query;

  const offer = prisma.offer.findUnique({
    where: {
      id: offerId,
    },
  });
  res.status(200).json(offer);
}
