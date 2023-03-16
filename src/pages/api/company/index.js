import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const companies = await prisma.company.findMany();
  res.json(companies);
}
