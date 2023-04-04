import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, name, type, path } = req.body;
  console.log('req.body => ', req.body);

  try {
    const result = await prisma.application.create({
      data: {
        user: { connect: { id: userId } },

        name,
        type,

        path,
      },
    });
    prisma.$disconnect();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: 'Error occurred while adding a new user to offer.' });
  }
}
