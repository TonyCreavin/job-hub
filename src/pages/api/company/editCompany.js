import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const {
    id,
    name,
    address,
    city,
    postcode,
    description,
    phone,
    website,
    imageUrl,
    country,
  } = req.body;
  const company = await prisma.company.update({
    where: { id: id },
    data: {
      name,
      address,
      city,
      postcode,
      description,
      phone,
      website,
      imageUrl,
      country,
    },
  });
  res.status(200).json(company);
}
