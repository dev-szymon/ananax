import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserIngredientsCreated } from '../../../lib/db-admin';
import { auth } from '../../../lib/firebase-admin';

export default async function createIngredientApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.token) {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const { ingredients } = await getUserIngredientsCreated(uid);
    res.status(200).json({ ingredients });
  }
}
