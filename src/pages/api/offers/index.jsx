import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const offers = await prisma.offer.findMany({});
  res.status(200).json(offers);
}