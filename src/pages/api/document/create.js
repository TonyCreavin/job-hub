import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { userId, offerId, name, type, category, path, applicationId } =
    req.body;

  try {
    const result = await prisma.application.create({
      data: {
        user: { connect: { id: userId } },
        offer: { connect: { id: offerId } },
        application: { connect: { id: applicationId } },
        name,
        type,
        category,
        path,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ err: 'Error occurred while adding a new user to offer.' });
  }
}
