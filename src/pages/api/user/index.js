import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const user = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.status(200).json(user);
  await prisma.$disconnect();
}
