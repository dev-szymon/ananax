import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllRecipes } from '../../../lib/db-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipes = await getAllRecipes();
  res.status(200).json({ recipes });
}
