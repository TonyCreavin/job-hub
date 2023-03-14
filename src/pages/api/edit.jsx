import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { id, title, location, contractType, description } = req.body;
  const offer = await prisma.offer.update({
    where: { id },
    data: { title, location, contractType, description },
  }); // Update a single offer by unique ID (id)
  res.json(offer);
}
