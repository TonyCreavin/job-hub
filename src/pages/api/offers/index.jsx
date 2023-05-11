import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const offers = await prisma.offer.findMany({
    include: {
      user: true,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(offers);
}
