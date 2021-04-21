import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { onCreateIngredient } from '../../lib/db-admin';
import { auth } from '../../lib/firebase-admin';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ ...fields, ...files });
    });
  });

  if (req.headers.token) {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);

    const { files, values } = data;
    const { fats, kcal, carbs, protein, glycemicIndex, name } = JSON.parse(
      values
    );
    const cloudinaryResponse = await cloudinary.uploader.upload(
      files.path,
      { upload_preset: 'fwwd2pmr' },
      async function (error, result) {
        if (error) {
          return error;
        }
        if (!error && result) {
          return result;
        }
      }
    );
    const firestoreResponse = await onCreateIngredient({
      name: name as string,
      authorId: uid as string,
      createdAt: new Date().toISOString(),
      nutrients: {
        fats: fats as number,
        kcal: kcal as number,
        carbs: carbs as number,
        protein: protein as number,
        glycemicIndex: glycemicIndex as number,
      },
      images: [cloudinaryResponse.secure_url],
    });
    if (firestoreResponse.id) {
      res.status(200).json({ ingredient: firestoreResponse.id });
    }
  }
}
