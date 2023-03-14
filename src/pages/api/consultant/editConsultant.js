import prisma from '../../../../lib/prisma';
export default async function handle(req, res) {
  const consultantId = req.query.consultantId;
  const consultant = await prisma.consultant.update({
    where: {
      id: consultantId,
    },
    data: {
      ...req.body,
    },
  }); // Find all users in the database and return them as JSON objects
  res.json(consultant);
}
