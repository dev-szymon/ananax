import type { NextApiRequest, NextApiResponse } from 'next';
import { getInfiniteIngredients } from '../../../lib/db-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryCursor = Number(req.query?.cursor);
  const cursor = queryCursor > 0 ? queryCursor : undefined;

  const ingredients = await getInfiniteIngredients(cursor);
  res.status(200).json({ ...ingredients });
}
