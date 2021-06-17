import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserIngredientsCreated } from '../../../lib/db-admin';
import { auth } from '../../../lib/firebase-admin';

export default async function ingredientsCreatedApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.token) {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);

    const queryCursor = Number(req.query?.cursor);
    const cursor = queryCursor > 0 ? queryCursor : undefined;
    const ingredients = await getUserIngredientsCreated(uid, cursor);
    res.status(200).json({ ...ingredients });
  }
}
