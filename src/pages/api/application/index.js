import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const applications = await prisma.application.findMany({});
  res.status(200).json(applications);
  await prisma.$disconnect();
}
