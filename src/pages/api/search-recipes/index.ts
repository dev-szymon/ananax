import type { NextApiRequest, NextApiResponse } from 'next';
import { getInfiniteRecipes } from '../../../lib/db-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipes = await getInfiniteRecipes();
  res.status(200).json({ recipes });
}
