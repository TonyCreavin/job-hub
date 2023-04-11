import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const deleteOffer = await prisma.offer.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    res.status(200).json(deleteOffer);
  } catch (error) {
    await prisma.$disconnect();
    res.status(403).json({ err: 'Error while deleting offer' });
  }
}
