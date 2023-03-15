import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id, title, location, contractType, description, website, skills } =
    req.body;
  const offer = await prisma.offer.update({
    where: { id },
    data: { title, location, contractType, description, website, skills },
  });
  res.json(offer);
}
