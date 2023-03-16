import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id, title, location, contractType, description, companyId, skills } =
    req.body;
  const offer = await prisma.offer.update({
    where: { id },
    data: { title, location, contractType, description, companyId, skills },
  });
  res.json(offer);
}
