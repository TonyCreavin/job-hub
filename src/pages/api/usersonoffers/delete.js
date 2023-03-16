import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { usersonoffersId } = req.query;

  try {
    const result = await prisma.usersonoffers.delete({
      where: {
        id: usersonoffersId,
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete usersonoffers record.' });
  }
}
