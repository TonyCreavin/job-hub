import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const data = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    const category = await prisma.category.findUnique({
      where: {
        id: data.categoryId,
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
        category: {
          connect: { id: category.id },
        },
      },
    });
    // const favorite = await prisma.favorite.create({
    //   data: {
    //     offer: { connect: { id: offer.id } },
    //   },
    // });

    await prisma.$disconnect();
    res.json(offer);
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
  }
}
