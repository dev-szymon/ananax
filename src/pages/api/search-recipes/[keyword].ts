import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecipesByKeyword } from '../../../lib/db-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { keyword } = req.query;

  if (typeof keyword === 'string') {
    const recipes = await getRecipesByKeyword(keyword);
    res.status(200).json({ recipes });
  }

  res.status(400).json({ message: 'invalid query' });
}
