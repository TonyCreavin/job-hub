import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const { id, name, name_en } = req.body;
  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        name_en,
      },
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
