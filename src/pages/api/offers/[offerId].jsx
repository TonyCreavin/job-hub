import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const offerId = req.query.offerId;
  const categoryId = req.query.categoryId;
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      user: true,
      category: categoryId ? { where: { id: categoryId } } : true,
    },
  });
  await prisma.$disconnect();
  res.json(offer);
}
