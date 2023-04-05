import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const deleteApplication = await prisma.application.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deleteApplication);
    await prisma.$disconnect();
  } catch (error) {
    res.status(403).json({ err: 'Error while deleting application' });
    await prisma.$disconnect();
  }
}
