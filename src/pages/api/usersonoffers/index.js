import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const usersonoffers = await prisma.useronoffers.findMany({});
  res.status(200).json(usersonoffers);
}
