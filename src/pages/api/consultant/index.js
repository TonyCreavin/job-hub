import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const consultant = await prisma.consultant.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.status(200).json(consultant);
}
