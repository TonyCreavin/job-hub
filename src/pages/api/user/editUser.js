import prisma from '../../../../lib/prisma';
export default async function handler(req, res) {
  const {
    id,
    firstName,
    lastName,
    github,
    skills,
    address,
    email,
    password,
    phone,
    linkedin,
    imageUrl,
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
      github,
      skills,
      address,
      email,
      password,
      phone,
      linkedin,
      imageUrl,
      city,
      postcode,
      country,
      cv,
      coverletter,
    },
  });
  res.json(user);
}
