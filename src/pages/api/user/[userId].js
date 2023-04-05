import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const userId = req.query.userId;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  res.status(200).json(user);
  await prisma.$disconnect();
}
