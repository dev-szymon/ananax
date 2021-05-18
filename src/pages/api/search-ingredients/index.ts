import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllIngredients } from '../../../lib/db-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryCursor = Number(req.query?.cursor);
  const cursor = queryCursor > 0 ? queryCursor : undefined;

  const ingredients = await getAllIngredients(cursor);
  res.status(200).json({ ...ingredients });
}
