import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const application = await prisma.application.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        offer: true,
        document: true,
      },
    });
    if (!application) {
      res.status(404).json({ error: 'Application not found.' });
    }
    await prisma.$disconnect();
    res.status(200).json(application);
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    res.status(500).json({ error: 'Unable to update application record.' });
  }
}
