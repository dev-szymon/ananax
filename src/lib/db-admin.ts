import { db } from './firebase-admin';
import { ICreateIngredientData, IIngredientData } from './firestore';

export const onCreateIngredient = async (data: ICreateIngredientData) => {
  const authorData = await db.collection('users').doc(data.authorId).get();

  return db
    .collection('nodes')
    .add({
      ...data,
      type: 'ingredient',
      authorUsername: authorData.data()?.username,
    })
    .then(async function (docRef) {
      return await docRef.get().then(async function (doc) {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
};

export const getUserIngredientsCreated = async (uid: string) => {
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'ingredient')
    .where('authorId', '==', uid)
    .get();

  const ingredients: IIngredientData[] = [];

  snapshot.forEach((doc) => {
    ingredients.push({
      id: doc.id,
      ...doc.data(),
    } as IIngredientData);
  });

  ingredients.sort((a, b) => {
    return Date.parse(a.createdAt) - Date.parse(b.createdAt);
  });

  return { ingredients };
};
