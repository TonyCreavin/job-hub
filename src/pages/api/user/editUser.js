import prisma from '../../../../lib/prisma';
export default async function handler(req, res) {
  const {
    id,
    firstName,
    lastName,
    name,
    role,
    github,
    skills,
    emailVerified,
    address,
    email,
    notification,
    phone,
    linkedin,
    image,
    city,
    postcode,
    country,
  } = req.body;
  const user = await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      name,
      role,
      emailVerified,
      github,
      skills,
      address,
      email,
      notification,
      phone,
      linkedin,
      image,
      city,
      postcode,
      country,
    },
  });
  await prisma.$disconnect();
  res.json(user);
}
