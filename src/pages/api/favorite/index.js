import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const favorite = await prisma.favorite.findMany({});
  await prisma.$disconnect();
  res.status(200).json(favorite);
}
