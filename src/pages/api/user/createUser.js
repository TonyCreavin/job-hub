import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const data = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        ...data,
      },
    });

    await prisma.$disconnect();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(403).json({ err: 'Error occurred while adding a new user.' });
  }
}
