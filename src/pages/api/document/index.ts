import type { NextApiHandler, NextApiRequest } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import prisma from '../../../../lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};
const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = process.env.CV_DIR;
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + '_' + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  // if (req.method === 'GET') {
  //   const documents = await prisma.document.findMany();
  // }
  try {
    await fs.readdir(process.env.CV_DIR);
  } catch (error) {
    console.log('error uploading cv to server');
  }
  await readFile(req, true);
  res.json({ done: 'ok' });
};
export default handler;
