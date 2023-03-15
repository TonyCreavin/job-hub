import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const data = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: 'Error occurred while adding a new user.' });
  }
}
