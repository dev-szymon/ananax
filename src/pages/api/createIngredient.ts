import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (file: any) => {
  try {
    const cloudinaryData = new FormData();
    cloudinaryData.append('file', file);
    cloudinaryData.append('upload_preset', 'fwwd2pmr');
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dq104qc4m/image/upload`,
      {
        method: 'POST',
        body: cloudinaryData,
      }
    );
    const resCloudinary = await res.json();
    return resCloudinary;
  } catch (err) {
    console.log(err);
  }
};
export default async function createIngredient(
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

  cloudinary.uploader.upload(data.files, function (error: any, result: any) {
    console.log(result, error);
  });
  console.log(data);
  const file_url = uploadFile(data.files);
  res.status(200).json({ data: file_url });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
