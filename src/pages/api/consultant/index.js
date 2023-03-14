import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const consultant = await prisma.consultant.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  }); // Find all users in the database and return them as JSON objects
  res.json(consultant);
}
