import type { NextApiHandler, NextApiRequest } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import prisma from '../../../../lib/prisma';
import { fileURLToPath } from 'url';

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
      console.log('filepath', fileURLToPath);
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
      console.log('fields => ', fields);
      console.log('files => ', `${process.env.CV_DIR}`);
      const file = files.myCv;
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(process.env.CV_DIR as string);
  } catch (error) {
    console.log('error uploading cv to server');
  }
  await readFile(req, true);
  res.json({ done: 'ok' });
};
export default handler;
function getPath(arg0: string): any {
  throw new Error('Function not implemented.');
}
// export const handle = async (req, res) => {
//   const { userId, cv, path } = req.body as {
//     userId: string;
//     cv: string;
//     path: string;
//   };
//   console.log('req.body => ', req.body);
//   const document = await prisma.document.create({
//     data: {
//       userId,
//       cv,
//       path,
//     },
//   });
//   res.json(document);
//};
