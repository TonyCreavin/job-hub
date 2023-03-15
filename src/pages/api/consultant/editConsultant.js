import prisma from '../../../../lib/prisma';
export default async function handler(req, res) {
  const {
    id,
    firstName,
    lastName,
    website,
    company,
    email,
    password,
    phone,
    linkedin,
    imageUrl,
    city,
    postcode,
    country,
  } = req.body;
  const consultant = await prisma.consultant.update({
    where: { id },
    data: {
      firstName,
      lastName,
      website,
      company,
      email,
      password,
      phone,
      linkedin,
      imageUrl,
      city,
      postcode,
      country,
    },
  });
  res.json(consultant);
}
