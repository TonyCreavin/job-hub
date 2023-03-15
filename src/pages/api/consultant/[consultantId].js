import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const consultantId = req.query.consultantId;
  const consultant = await prisma.consultant.findUnique({
    where: {
      id: consultantId,
    },
  });
  res.status(200).json(consultant);
}
