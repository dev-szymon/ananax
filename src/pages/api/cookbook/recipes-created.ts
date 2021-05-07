import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserRecipesCreated } from '../../../lib/db-admin';
import { auth } from '../../../lib/firebase-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.token) {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const recipes = await getUserRecipesCreated(uid);
    res.status(200).json({ recipes });
  }
}
