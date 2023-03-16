export default async function handler(req, res) {
  const usersonoffersId = req.query.usersonoffersId;
  const usersonoffers = await prisma.useronoffers.findUnique({
    where: {
      id: usersonoffersId,
    },
  });
  res.status(200).json(usersonoffers);
}
