import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(user);
}
