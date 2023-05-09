import prisma from '../../../lib/prisma';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { getSession } from 'next-auth/react';

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.env.CV_DIR), {
      recursive: true,
    });
  } catch (error) {
    console.error(error);
    await fs.mkdir(path.join(process.env.CV_DIR), {
      recursive: true,
    });
  }

  const form = formidable({
    uploadDir: path.join(process.env.CV_DIR),
    keepExtensions: true,
    multiples: true,
    filename: (name, ext, file, form) => {
      return Date.now().toString() + '_' + file.originalFilename;
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);

      return res.status(500).send('Internal Server Error');
    }
    const session = await getSession({ req });
    const userId = session.user.id;

    const file = files.myCv;
    console.log(file);
    await prisma.document.create({
      data: {
        filename: file.newFilename,
        path: file.filepath,
        size: file.size,
        mimetype: file.mimetype,
        userId: userId,
      },
    });
    await prisma.$disconnect();
    res.status(201).json('{ createdCv }');
  });
};
export default async function handlerWrapper(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      await handler(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
