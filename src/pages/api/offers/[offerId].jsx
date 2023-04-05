import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const offerId = req.query.offerId;
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      user: true,
    },
  });
  res.json(offer);
  await prisma.$disconnect();
}
