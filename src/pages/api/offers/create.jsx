import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const data = req.body;
  try {
    const offer = await prisma.offer.create({
      data: {
        title: data.title,
        location: data.location,
        contractType: data.contractType,
        description: data.description,
        companyId: data.companyId,
        skills: data.skills,
        salary: data.salary,
      },
    });
    res.json(offer);
  } catch (error) {
    console.log(error);
  }
}
