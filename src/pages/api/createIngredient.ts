import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export default async function createIngredient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ ...fields, ...files });
    });
  });

  console.log(data);
  res.status(200).json({ data: 'data' });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
