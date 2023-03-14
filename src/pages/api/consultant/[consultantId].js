import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const consultantId = req.query.consultantId;
  const consultant = await prisma.consultant.findUnique({
    where: {
      id: consultantId,
    },
  }); // Find all users in the database and return them as JSON objects
  res.json(consultant);
}
