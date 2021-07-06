import type { NextApiRequest, NextApiResponse } from 'next';
import { getIngredientsByKeyword } from '../../../lib/db-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { keyword } = req.query;

  if (typeof keyword === 'string') {
    const ingredients = await getIngredientsByKeyword(keyword);
    console.log(ingredients);
    return res.status(200).json({ ingredients });
  }

  return res.status(400).json({ message: 'invalid query' });
}
