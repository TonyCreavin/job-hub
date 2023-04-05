import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const deleteDocument = await prisma.document.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deleteDocument);
    await prisma.$disconnect();
  } catch (error) {
    res.status(403).json({ err: 'Error while deleting document' });
    await prisma.$disconnect();
  }
}
