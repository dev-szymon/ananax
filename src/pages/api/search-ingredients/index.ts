import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllIngredients } from '../../../lib/db-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ingredients = await getAllIngredients();
  res.status(200).json({ ingredients });
}
