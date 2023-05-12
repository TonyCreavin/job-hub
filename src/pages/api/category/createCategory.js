import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const { name, name_en } = req.body;
  console.log(`Received category: ${name} (${name_en})`);
  try {
    const category = await prisma.category.create({
      data: {
        name: name,
        name_en,
      },
    });
    console.log(
      `Category ${category.name} (${category.name_en}) created successfully`
    );
    res.status(200).json(category);
  } catch (err) {
    console.error(`Error creating category: ${err.message}`);

    res.status(500).json({ message: err.message });
  }
}
