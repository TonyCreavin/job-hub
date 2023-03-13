import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id, title, location, website, description, skills } = req.body;
  try {
    const editOffer = await prisma.offer.update({
      where: { id },
      data: {
        title,
        location,
        website,
        description,
        skills,
        contractType,
      },
    });
    res.status(200).json(editOffer);
  } catch (error) {
    res.status(403).json({ err: 'Error occurred while updating' });
  }
}
