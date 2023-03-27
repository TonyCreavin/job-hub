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
    password,
    phone,
    linkedin,
    image,
    city,
    postcode,
    country,
    cv,
    coverletter,
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
      password,
      phone,
      linkedin,
      image,
      city,
      postcode,
      country,
      cv,
      coverletter,
    },
  });
  res.json(user);
}
