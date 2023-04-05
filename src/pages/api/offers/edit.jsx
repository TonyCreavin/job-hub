import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const {
    id,
    title,
    location,
    contractType,
    description,

    skills,
    salary,
    company,
    website,
    companyDescription,
  } = req.body;
  const offer = await prisma.offer.update({
    where: { id },
    data: {
      title,
      location,
      contractType,
      description,

      skills,
      salary,
      company,
      website,
      companyDescription,
    },
  });
  await prisma.$disconnect();
  res.json(offer);
}
