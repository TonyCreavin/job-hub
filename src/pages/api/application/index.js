import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const applications = await prisma.application.findMany({});
  await prisma.$disconnect();
  res.status(200).json(applications);
}
