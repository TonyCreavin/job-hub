import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const result = await prisma.company.delete({
      where: {
        id,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ err: 'Error occurred while deleting company.' });
  }
}
