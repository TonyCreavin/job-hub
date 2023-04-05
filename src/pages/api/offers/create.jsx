import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const data = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    const offer = await prisma.offer.create({
      data: {
        title: data.title,
        location: data.location,
        contractType: data.contractType,
        description: data.description,
        company: data.company,
        skills: data.skills,
        salary: data.salary,
        website: data.website,
        companyDescription: data.companyDescription,
        user: {
          connect: { id: user.id },
        },
      },
      include: {
        user: true,
      },
    });
    await prisma.$disconnect();
    res.json(offer);
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
  }
}
