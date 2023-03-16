import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const companyId = req.query.companyId;
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });
  res.json(company);
}
