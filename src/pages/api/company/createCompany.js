import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const data = req.body;
  try {
    const result = await prisma.company.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ err: 'Error occurred while creating company.' });
  }
}
