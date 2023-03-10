export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, location, website, contractType, description, skills } =
      req.body;
    const offerItem = {
      title,
      location,
      description,
      skills,
      contractType,
      website,
    };
    const offer = await prisma.offer.create({
      data: offerItem,
    });
    res.status(201).json(offer);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
