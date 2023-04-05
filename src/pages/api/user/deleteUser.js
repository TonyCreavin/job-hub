import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deleteUser);
    await prisma.$disconnect();
  } catch (error) {
    res.status(403).json({ err: 'Error while deleting user' });
    await prisma.$disconnect();
  }
}
