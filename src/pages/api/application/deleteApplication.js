import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const deleteApplication = await prisma.application.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    res.status(200).json(deleteApplication);
  } catch (error) {
    await prisma.$disconnect();
    res.status(403).json({ err: 'Error while deleting application' });
  }
}
