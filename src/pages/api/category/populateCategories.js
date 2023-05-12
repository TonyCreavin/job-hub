import prisma from '../../../../lib/prisma';

const categories = [
  'Développement web',
  'B2B',
  'RH',
  'SEO & Digital Marketing',
  'Graphisme',
];

export default async function handler(req, res) {
  try {
    for (let i = 0; i < categories.length; i++) {
      const category = await prisma.category.create({
        data: {
          name: categories[i],
          name_en: categories[i].toLowerCase().replace(/\s/g, '_'),
        },
      });
      console.log(`Category ${category.name} created`);
    }
    res.status(200).json({ message: 'Categories populated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
