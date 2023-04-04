import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const applicationId = req.query.applicationId;
  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  res.status(200).json(application);
}
